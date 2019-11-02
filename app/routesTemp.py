import pandas as pd
from flask import Blueprint, request, jsonify, redirect, Response
from passlib.hash import pbkdf2_sha256
from app import app, db

from .models import User
from .services import UserService

userService = UserService()

@app.route('/api/login', methods=['POST'])
def login():
    form_data = request.get_json()
    
    find_user = userService.find_user({'username': form_data['username']})

    if(find_user):
        password_hash = pbkdf2_sha256.hash(form_data['password'])
        

@app.route('/api/signup', methods=['POST'])
def register():
    form_data = request.get_json()

    username = form_data['username']
    password = form_data['password']
    email = form_data['email'] if 'email' in form_data else ''
    fullname = form_data['fullname']
    roletype = form_data['roletype']

    password_hash = pbkdf2_sha256.hash(password)

    existing_user = userService.find_user({'username':username})

    if(existing_user):
        temp_data = {
            'status': -1,
            'error': 'A user with that username already exists.'
        }
        # -1 indicates the user already exists
        return jsonify(temp_data)

    new_user = User(
        username=username, 
        password=password_hash, 
        email=email, 
        fullname=fullname, 
        role_type=roletype
    )

    db.session.add(new_user)
    db.session.commit()    

    temp_data ={
        "id": 1,
        "username": username,
        "roletype": roletype
    }

    return jsonify(temp_data)

@app.route('/api/users', methods=['GET', 'POST'])
def users():
    if(request.method == 'GET'):
        users = userService.find_all_users()
        print(users)
        
        return jsonify({'users': users})
    else:
        form_data = request.get_json()

        password_hash = pbkdf2_sha256.hash(form_data['password'])

        new_user = userService.add_user(
            username = form_data['username'],
            password = password_hash,
            email = form_data['email'],
            fullname = form_data['fullname'] ,
            role_type = form_data['roletype']
        )

        userService.commit_action()

        return jsonify(new_user)

@app.route('/api/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = userService.find_user({'id':user_id})

    if(user):
        userService.delete_user({'id':user_id})
        userService.commit_action()

        return Response(status=204)
    else:
        return Response( {'error': 'User not found'}, status=404)
    
