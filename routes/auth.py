from flask import Blueprint, request, jsonify
from passlib.hash import pbkdf2_sha256
from app import app, db
from models import User

@app.route('/api/signup', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']
    password_hash = pbkdf2_sha256.hash(password)

    existing_user = db.User.query.filter_by(username=username).first() 
    
    if(existing_user):
        return "user exists"

    new_user = db.User(username=username, password=password_hash)
    db.session.add(new_user)
    db.session.commit()

    print(new_user.id)
    return new_user.id

@app.route('/api/users', methods=['GET'])
def currentuser():
    current_users = db.User.query.all()
    print(current_users)
    return current_users