import os
basedir = os.path.abspath(os.path.dirname(__file__))
print(basedir)
class BaseConfig(object):
    DEBUG = True
    TESTING = False

class ProductionConfig(BaseConfig):
    DEBUG = False 

class DevelopmentConfig(BaseConfig):
    DEBUG = True
    TESTING = True

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'arsenal'
    DEBUG = os.environ.get('ENVIRONMENT') or 'develop'
    
    if(DEBUG == "develop"):
        DEBUG = DevelopmentConfig.DEBUG 
    else:
        DEBUG = ProductionConfig.DEBUG
 
    CORS_HEADERS = "Content-Type"
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'app.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False