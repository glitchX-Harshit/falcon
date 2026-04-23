import pandas as pd
from loguru import logger
from datetime import datetime

class BreakoutStrategy:
    def __init__(self, config):
        self.config = config
        self.params = self.config.strategy.get('params', {})
        self.lookback = self.params.get('lookback_period', 20)
        self.buffer = self.params.get('breakout_buffer', 0.2)
        self.confirmation_close = self.params.get('confirmation_close', False)
        
        self.trend_filter = self.params.get('trend_filter', {})
        self.session_filter = self.params.get('session_filter', {})
        
    def calculate_atr(self, df, period):
        df['high_low'] = df['high'] - df['low']
        df['high_close'] = abs(df['high'] - df['close'].shift())
        df['low_close'] = abs(df['low'] - df['close'].shift())
        df['tr'] = df[['high_low', 'high_close', 'low_close']].max(axis=1)
        df['atr'] = df['tr'].rolling(window=period).mean()
        return df['atr'].iloc[-1]
        
    def check_session(self):
        if not self.session_filter.get('enabled', False):
            return True
            
        sessions = self.session_filter.get('sessions', [])
        # Simple approximation using UTC hours
        current_hour = datetime.utcnow().hour
        
        in_session = False
        if "london" in sessions and 7 <= current_hour < 16:
            in_session = True
        if "new_york" in sessions and 13 <= current_hour < 22:
            in_session = True
            
        return in_session
        
    def analyze(self, df, current_price):
        if len(df) < max(self.lookback, self.trend_filter.get('period', 0)):
            return None
            
        if not self.check_session():
            return None
            
        # Trend Filter (EMA)
        trend_direction = 0 # 1 up, -1 down, 0 flat
        if self.trend_filter.get('enabled', False):
            period = self.trend_filter.get('period', 50)
            df['ema'] = df['close'].ewm(span=period, adjust=False).mean()
            current_ema = df['ema'].iloc[-1]
            if current_price['bid'] > current_ema:
                trend_direction = 1
            else:
                trend_direction = -1
                
            mode = self.trend_filter.get('mode', 'with_trend')
            if mode == 'counter':
                trend_direction = -trend_direction

        # Get historical high and low for the lookback period
        hist_df = df.iloc[-(self.lookback+1):-1]
        period_high = hist_df['high'].max()
        period_low = hist_df['low'].min()
        
        # Calculate ATR for risk
        atr_period = self.config.risk.get('stop_loss', {}).get('atr_period', 14)
        current_atr = self.calculate_atr(df.copy(), atr_period)
        
        bid = current_price['bid']
        ask = current_price['ask']
        current_close = df['close'].iloc[-1]
        
        signal = None
        
        # Long condition
        if self.config.execution.get('allow_long', True):
            if self.trend_filter.get('enabled', False) and trend_direction != 1:
                pass # Filtered out
            else:
                if self.confirmation_close:
                    if current_close > (period_high + self.buffer):
                        signal = 'buy'
                else:
                    if ask > (period_high + self.buffer):
                        signal = 'buy'
                
        # Short condition
        if self.config.execution.get('allow_short', True) and signal is None:
            if self.trend_filter.get('enabled', False) and trend_direction != -1:
                pass # Filtered out
            else:
                if self.confirmation_close:
                    if current_close < (period_low - self.buffer):
                        signal = 'sell'
                else:
                    if bid < (period_low - self.buffer):
                        signal = 'sell'
                
        if signal:
            if self.config.logging.get('debug_signals', False):
                logger.debug(f"Signal {signal.upper()} triggered. Close: {current_close}, High: {period_high}, Low: {period_low}")
            
            risk_conf = self.config.risk
            
            sl_type = risk_conf.get('stop_loss', {}).get('type', 'atr')
            if sl_type == 'atr':
                sl_dist = current_atr * risk_conf.get('stop_loss', {}).get('atr_multiplier', 2.0)
            else:
                sl_dist = risk_conf.get('stop_loss', {}).get('fixed_pips', 200) * 0.001
                
            tp_type = risk_conf.get('take_profit', {}).get('type', 'rr')
            if tp_type == 'rr':
                tp_dist = sl_dist * risk_conf.get('risk_reward_ratio', 2.0)
            else:
                tp_dist = risk_conf.get('take_profit', {}).get('fixed_pips', 400) * 0.001
                
            if signal == 'buy':
                sl = ask - sl_dist
                tp = ask + tp_dist
                entry_price = ask
            else:
                sl = bid + sl_dist
                tp = bid - tp_dist
                entry_price = bid
                
            volume = 0.01 
            
            return {
                'action': signal,
                'price': entry_price,
                'sl': sl,
                'tp': tp,
                'volume': volume
            }
            
        return None
