import time
import os
from loguru import logger
from config import Config
from mt5_engine import MT5Engine
from strategy import BreakoutStrategy

def setup_logger(config):
    log_level = config.system.get('log_level', 'INFO').upper()
    log_file = config.logging.get('file', 'logs/trades.csv')
    
    # Ensure log directory exists
    os.makedirs(os.path.dirname(log_file) or '.', exist_ok=True)
    
    logger.add(log_file, rotation="10 MB", level=log_level, format="{time} | {level} | {message}")

def main():
    config_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'yaml_block', 'v2.yaml')
    config = Config(config_path)
    
    setup_logger(config)
    logger.info(f"Starting {config.system.get('name')} in {config.system.get('mode')} mode.")
    
    engine = MT5Engine(config)
    if not engine.connect():
        logger.error("Failed to connect to MT5. Exiting.")
        return
        
    strategy = BreakoutStrategy(config)
    
    max_open_trades = config.execution.get('max_open_trades', 1)
    interval = config.scheduler.get('interval_seconds', 60)
    num_candles = config.data.get('candles', 150) # increased for EMA50
    
    logger.info("Entering main trading loop...")
    try:
        while True:
            # Check open positions
            open_positions = engine.get_open_positions()
            
            # Manage trailing stops if enabled
            if config.risk.get('trailing_stop', {}).get('enabled', False) and open_positions:
                engine.manage_trailing_stops(open_positions)
            
            if len(open_positions) >= max_open_trades:
                time.sleep(interval)
                continue
                
            # Fetch data
            df = engine.get_historical_data(num_candles)
            if df is None:
                time.sleep(interval)
                continue
                
            # Get current price
            price = engine.get_current_price()
            if price is None:
                time.sleep(interval)
                continue
                
            # Analyze strategy
            signal = strategy.analyze(df, price)
            
            # Execute
            if signal:
                engine.place_order(
                    order_type=signal['action'],
                    volume=signal['volume'],
                    price=signal['price'],
                    sl=signal['sl'],
                    tp=signal['tp']
                )
                
            time.sleep(interval)
            
    except KeyboardInterrupt:
        logger.info("Bot stopped by user.")
    finally:
        engine.close()
        logger.info("MT5 connection closed.")

if __name__ == "__main__":
    main()
