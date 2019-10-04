from flask import Flask, render_template, Response, request, jsonify, redirect, make_response
from flask_cors import CORS, cross_origin
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate
from config import Config

app = Flask(__name__, static_folder ="./build/static/", template_folder="./build")
app.config.from_object(Config)
CORS(app)

db = SQLAlchemy(app)
db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)

migrate = Migrate(app, db)

from app import routes, models