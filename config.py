import os
from os.path import join, dirname
from dotenv import load_dotenv
basedir = os.path.abspath(os.path.dirname(__file__))

class BaseConfig(object):
    DEBUG = True
    TESTING = False

class ProductionConfig(BaseConfig):
    DEBUG = False 

class DevelopmentConfig(BaseConfig):
    DEBUG = True
    TESTING = True

class Config(object):
    flask_env = join(dirname(__file__), '.flaskenv')
    load_dotenv(flask_env)
    
    DEBUG = os.environ.get('FLASK_ENV') or 'development'
    
    if(DEBUG == "development"):
        DEBUG = DevelopmentConfig.DEBUG 
    else:
        DEBUG = ProductionConfig.DEBUG
 
    CORS_HEADERS = "Content-Type"

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    SECRET_KEY = os.environ.get('SECRET_KEY')