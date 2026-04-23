import MetaTrader5 as mt5
import pandas as pd
from loguru import logger
import time

class MT5Engine:
    def __init__(self, config):
        self.config = config
        self.symbol = self.config.broker.get('symbol', 'XAUUSD')
        self.magic = self.config.broker.get('magic_number', 10001)
        self.slippage = self.config.broker.get('slippage', 20)
        self.paper_mode = self.config.system.get('mode') == 'paper'

        # Map string timeframe to MT5 timeframe
        tf_str = self.config.broker.get('timeframe', 'M5')
        self.timeframe = self._get_timeframe(tf_str)
        
    def _get_timeframe(self, tf_str):
        mapping = {
            'M1': mt5.TIMEFRAME_M1,
            'M5': mt5.TIMEFRAME_M5,
            'M15': mt5.TIMEFRAME_M15,
            'H1': mt5.TIMEFRAME_H1,
            'D1': mt5.TIMEFRAME_D1,
        }
        return mapping.get(tf_str, mt5.TIMEFRAME_M5)

    def connect(self):
        logger.info("Connecting to MT5...")
        
        credentials = self.config.broker.get('credentials', {})
        login = credentials.get('login')
        password = credentials.get('password')
        server = credentials.get('server')
        path = credentials.get('path')
        
        # Initialize MT5
        init_kwargs = {}
        if path:
            init_kwargs['path'] = path
            
        if not mt5.initialize(**init_kwargs):
            logger.error(f"MT5 initialization failed, error code: {mt5.last_error()}")
            return False
            
        # Login if credentials are provided
        if login and password and server:
            try:
                login_int = int(login)
            except ValueError:
                logger.error("MT5 login must be an integer.")
                return False
                
            authorized = mt5.login(login=login_int, password=password, server=server)
            if not authorized:
                logger.error(f"MT5 login failed, error code: {mt5.last_error()}")
                return False
            logger.info("MT5 Login successful.")
            
        # Ensure symbol is available
        if not mt5.symbol_select(self.symbol, True):
            logger.error(f"Symbol {self.symbol} not found.")
            return False
            
        logger.info(f"Connected to MT5. Mode: {'PAPER' if self.paper_mode else 'LIVE'}")
        return True

    def get_historical_data(self, num_candles):
        rates = mt5.copy_rates_from_pos(self.symbol, self.timeframe, 0, num_candles)
        if rates is None or len(rates) == 0:
            logger.error(f"Failed to fetch data for {self.symbol}")
            return None
            
        df = pd.DataFrame(rates)
        df['time'] = pd.to_datetime(df['time'], unit='s')
        df.set_index('time', inplace=True)
        return df
        
    def get_current_price(self):
        tick = mt5.symbol_info_tick(self.symbol)
        if tick is None:
            return None
        return {'bid': tick.bid, 'ask': tick.ask}
        
    def get_open_positions(self):
        positions = mt5.positions_get(symbol=self.symbol)
        if positions is None:
            return []
        # Filter by magic number
        return [p for p in positions if p.magic == self.magic]

    def place_order(self, order_type, volume, price, sl, tp):
        if not self.config.execution.get('enable_trading', False):
            logger.warning("Trading is disabled in config execution.enable_trading.")
            return None

        if self.paper_mode:
            logger.info(f"[PAPER] Order {order_type} | Vol: {volume} | Price: {price} | SL: {sl} | TP: {tp}")
            return "PAPER_ORDER_ID"

        action = mt5.TRADE_ACTION_DEAL
        type_mt5 = mt5.ORDER_TYPE_BUY if order_type == 'buy' else mt5.ORDER_TYPE_SELL
        
        request = {
            "action": action,
            "symbol": self.symbol,
            "volume": float(volume),
            "type": type_mt5,
            "price": float(price),
            "sl": float(sl),
            "tp": float(tp),
            "deviation": self.slippage,
            "magic": self.magic,
            "comment": "Falcon Python Bot",
            "type_time": mt5.ORDER_TIME_GTC,
            "type_filling": mt5.ORDER_FILLING_IOC,
        }
        
        result = mt5.order_send(request)
        if result.retcode != mt5.TRADE_RETCODE_DONE:
            logger.error(f"Order failed, retcode: {result.retcode}")
            return None
            
        logger.info(f"Order executed! Ticket: {result.order}")
        return result.order

    def manage_trailing_stops(self, positions):
        if self.paper_mode:
            return
            
        ts_config = self.config.risk.get('trailing_stop', {})
        if not ts_config.get('enabled', False):
            return
            
        trigger_rr = ts_config.get('trigger_rr', 1.0)
        step_atr_mult = ts_config.get('step_atr_multiplier', 0.5)
        
        # Get current ATR for step size calculation
        df = self.get_historical_data(14)
        if df is None: return
        df['tr'] = df['high'] - df['low']
        current_atr = df['tr'].rolling(window=14).mean().iloc[-1]
        step_size = current_atr * step_atr_mult
        
        current_price = self.get_current_price()
        if not current_price: return

        for p in positions:
            # We assume initial SL distance is proportional to risk, or we can use price delta
            # A simple approach: calculate profit
            if p.type == mt5.ORDER_TYPE_BUY:
                profit_pips = current_price['bid'] - p.price_open
                if profit_pips > 0:
                    # check if we reached trigger
                    # (Simplified logic, we assume we want to trail by initial SL distance)
                    new_sl = current_price['bid'] - step_size * 2 # simplified trailing
                    if new_sl > p.sl + step_size:
                        self._modify_sl(p.ticket, new_sl)
            elif p.type == mt5.ORDER_TYPE_SELL:
                profit_pips = p.price_open - current_price['ask']
                if profit_pips > 0:
                    new_sl = current_price['ask'] + step_size * 2
                    if new_sl < p.sl - step_size or p.sl == 0:
                        self._modify_sl(p.ticket, new_sl)

    def _modify_sl(self, ticket, new_sl):
        request = {
            "action": mt5.TRADE_ACTION_SLTP,
            "position": ticket,
            "sl": float(new_sl),
        }
        result = mt5.order_send(request)
        if result and result.retcode == mt5.TRADE_RETCODE_DONE:
            logger.info(f"Trailing stop updated for {ticket} to {new_sl}")

    def close(self):
        mt5.shutdown()
