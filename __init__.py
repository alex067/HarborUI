from flask import Flask, render_template, Response, request, jsonify, redirect, make_response
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from .configurations import DevelopmentConfig

app = Flask(__name__, static_folder ="./build/static/", template_folder="./build")
app.config['DEBUG'] = DevelopmentConfig.DEBUG 
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db/sqlite.db'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
CORS(app)

db = SQLAlchemy(app)

login_manager = LoginManager()
login_manager.init_app(app)

from cronui import routes, models