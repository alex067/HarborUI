from flask import Blueprint, request, jsonify, redirect
from passlib.hash import pbkdf2_sha256
from app import app, db
from .models import User

@app.route('/api/signup', methods=['POST'])
def register():
    form_data = request.get_json()

    username = form_data['username']
    password = form_data['password']
    email = form_data['email'] if 'email' in form_data else ''
    fullname = form_data['fullname']
    roletype = form_data['roletype']

    password_hash = pbkdf2_sha256.hash(password)

    print(username, password, email, fullname, roletype)
    existing_user = User.query.filter_by(username=username).first() 
    print(existing_user)

    temp_data = {
        'status': -1,
        'error': 'User exists'
    }
    # -1 indicates the user already exists
    return jsonify(temp_data)
    
    if(existing_user):
        temp_data = {
            'status': -1,
            'error': 'User exists'
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
    #db.session.commit()

    temp_data ={
        "id": 1,
        "username": username,
        "roletype": roletype
    }

    return jsonify(temp_data)

@app.route('/api/users', methods=['GET'])
def currentuser():
    current_users = User.query.all()

    return jsonify({'users': current_users})