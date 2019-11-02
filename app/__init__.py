import os
from flask import Flask, render_template, Response, request, jsonify, redirect, make_response
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate

from config import Config

app = Flask(__name__, static_folder ="./build/static/", template_folder="./build")
app.config.from_object(Config)
CORS(app)

DB_TYPE = os.getenv('DB_TYPE', 'SQLITE')

if(DB_TYPE == "SQLITE"):
    db = SQLAlchemy(app)
    db.init_app(app)

login = LoginManager()
login.init_app(app)

migrate = Migrate(app, db)

from app import models
from app.routes.auth import auth_blueprint
from app.routes.api import api_blueprint
app.register_blueprint(auth_blueprint)
app.register_blueprint(api_blueprint)