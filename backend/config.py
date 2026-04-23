import yaml
import os
import re
from loguru import logger
from dotenv import load_dotenv

class Config:
    def __init__(self, config_path):
        # Load environment variables if defined
        env_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
        if os.path.exists(env_path):
            load_dotenv(env_path)
            
        with open(config_path, 'r') as file:
            raw_content = file.read()
            
        # Interpolate ${VAR} syntax before parsing YAML
        def expand_env_var(match):
            var_name = match.group(1)
            val = os.environ.get(var_name, '')
            return val
            
        interpolated_content = re.sub(r'\$\{([^}]+)\}', expand_env_var, raw_content)
        
        self._config = yaml.safe_load(interpolated_content)
        
        # Check required env vars
        self._validate_env()
        
    def _validate_env(self):
        required_vars = self._config.get('env', {}).get('required', [])
        missing = [v for v in required_vars if not os.environ.get(v)]
        if missing:
            logger.error(f"Missing required environment variables: {missing}")
            raise ValueError(f"Missing required env vars: {missing}")
            
    @property
    def system(self): return self._config.get('system', {})
    
    @property
    def broker(self): return self._config.get('broker', {})
    
    @property
    def execution(self): return self._config.get('execution', {})
    
    @property
    def strategy(self): return self._config.get('strategy', {})
    
    @property
    def risk(self): return self._config.get('risk', {})
    
    @property
    def filters(self): return self._config.get('filters', {})
    
    @property
    def data(self): return self._config.get('data', {})
    
    @property
    def scheduler(self): return self._config.get('scheduler', {})
    
    @property
    def logging(self): return self._config.get('logging', {})
    
    @property
    def safety(self): return self._config.get('safety', {})
