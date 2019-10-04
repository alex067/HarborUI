from flask import Blueprint, request, jsonify
from passlib.hash import pbkdf2_sha256
from app import app, db
from .models import User

@app.route('/api/signup', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']
    password_hash = pbkdf2_sha256.hash(password)

    existing_user = User.query.filter_by(username=username).first() 
    print(existing_user)
    
    if(existing_user):
        return "user exists"

    new_user = User(username=username, password=password_hash)
    db.session.add(new_user)
    db.session.commit()

    print(new_user.id)
    return new_user.id

@app.route('/api/users', methods=['GET'])
def currentuser():
    current_users = User.query.all()
    initial_setup = True if len(current_users) == 0 else False

    return jsonify({'setup': initial_setup})