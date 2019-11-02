import pandas as pd
from flask import Blueprint, request, jsonify, redirect, Response, make_response
from flask.views import MethodView
from app import app, db
from app.services import UserService

userService = UserService()

api_blueprint = Blueprint('api', __name__)

class UserAPI(MethodView):
    def get(self):
        all_users = userService.find_all_users()
        
        if(not all_users):
            response = {
                'status': 'error',
                'message': 'No users currently registered.' 
            }
            return make_response(jsonify(response), 404)
        
        response = {
            'status': 'success',
            'users': all_users
        }
        return make_response(jsonify(response), 200)
    
    def delete(self):
        userService.delete_all_users()
        userService.commit_action()
        
        return Response(status=204)
        
class UserSingleAPI(MethodView):
    def get(self, user_id):
        user = userService.find_user({'id': user_id})
        
        if(not user):
            response = {
                'status': 'error',
                'message': 'No such user exists.'
            }
            return make_response(jsonify(response), 404)

        response = {
            'status': 'success',
            'user': user
        }
        return make_response(jsonify(response), 200)
    
    def delete(self, user_id):
        user = userService.find_user({'id': id})

        if not user:
            response = {
                'status': 'error',
                'message': 'No such user exists.'
            }
            return make_response(jsonify(response), 404)

        userService.delete_user({'id': id})
        userService.commit_action()
    
        return Response(status=204)

user_view = UserAPI.as_view('user_api')
user_single_view = UserSingleAPI.as_view('user_single_api')

api_blueprint.add_url_rule('/api/users', view_func=user_view)

api_blueprint.add_url_rule('/api/users/<int:user_id>', view_func=user_single_view)