import pandas as pd
from flask import Blueprint, request, jsonify, redirect, Response, make_response
from flask_login import current_user, login_user
from flask.views import MethodView
from app import app, db
from app.models import User
from app.services import UserService

userService = UserService()

auth_blueprint = Blueprint('auth', __name__)

class RegisterAPI(MethodView):
    def post(self):
        form_data = request.get_json()

        username = form_data['username']
        password = form_data['password']
        email = form_data['email'] if 'email' in form_data else ''
        fullname = form_data['fullname']
        roletype = form_data['roletype']

        password_hash = userService.set_password(password)

        existing_user = userService.find_user({'username':username})
        
        if(existing_user):
            response = {
                'status': 'error',
                'error': 'A user with that username already exists.'
            }
            return make_response(jsonify(response), 200)

        new_user = userService.add_user(  
            auto_commit=True,          
            username=username, 
            password=password_hash, 
            email=email, 
            fullname=fullname, 
            role_type=roletype
        )

        response = {
            'status': 'success',
            'message': 'Successfully registered! Redirecting to login...',
            'auth_token': userService.decode_auth_token(new_user['auth_token'])
        }

        return make_response(jsonify(response), 201)    
    
    def get(self):
        '''
        Checks to see if any users exist, to render setup component
        '''
        

class LoginAPI(MethodView):
    def post(self):
        if current_user.is_authenticated:
            print("yes")
        form_data = request.get_json()

        username = form_data['username']
        plain_password = form_data['password']
        
        existing_user = userService.find_user({'username': username})

        if (not existing_user or not userService.check_password(plain_password )):
            response = {
                'status': 'error',
                'error': 'Invalid username or password.'
            }
            return make_response(jsonify(response), 404)
        
        auth_token = userService.encode_auth_token(existing_user.id)

        user ={
            'user_id': existing_user.id, 
            'username': existing_user.username,
            'roletype': existing_user.role_type,
            'token': userService.decode_auth_token(auth_token)
        }

        login_user(existing_user, remember=user)
      
        response={
            'status': 'success',
            'user': user
        }

        return make_response(jsonify(response), 200)

registration_view = RegisterAPI.as_view('register_api')
login_view = LoginAPI.as_view('login_api')

auth_blueprint.add_url_rule(
    '/auth/signup',
    view_func=registration_view,
    methods=['POST']
)

auth_blueprint.add_url_rule(
    '/auth/login',
    view_func=login_view,
    methods=["POST"]
)
