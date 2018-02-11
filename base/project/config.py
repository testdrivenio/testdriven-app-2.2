# project/config.py


import os


class BaseConfig:
    """Base configuration"""
    TESTING = False
    DEBUG_TB_ENABLED = False
    DEBUG_TB_INTERCEPT_REDIRECTS = False
    USERS_SERVICE_URL = os.environ.get('USERS_SERVICE_URL')
    SECRET_KEY = os.environ.get('SECRET_KEY')


class DevelopmentConfig(BaseConfig):
    """Development configuration"""
    DEBUG_TB_ENABLED = True


class TestingConfig(BaseConfig):
    """Testing configuration"""
    TESTING = True


class StagingConfig(BaseConfig):
    """Staging configuration"""
    TESTING = False


class ProductionConfig(BaseConfig):
    """Production configuration"""
    TESTING = False
