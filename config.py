import os
basedir = os.path.abspath(os.path.dirname(__file__))   # 确定项目文件的绝对路径，留作以后设置环境变量

class Config:
    APP_NAME = 'Design Inspiration'
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'I have a secret'

    @staticmethod
    def init_app(app):
        pass

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False


config = {
        'development': DevelopmentConfig,
        'production': ProductionConfig,
        'default': DevelopmentConfig
        }
