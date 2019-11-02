import os
from app import db
from app.models import User, Roles

class SqliteRepository(object):
    def __init__(self):
        self.db = db
        self.user = User()
        self.roles = Roles
    
    def find_all_users(self):
        users_db = self.user.query.all()
        current_users = [{'id': user.id, 'username': user.username, 'role': user.role_type, 'email': user.email, \
            'fullname': user.fullname} for user in users_db]
        return current_users

    def find_user(self, selector):
        return self.user.query.filter_by(**selector).first()  
    
    def delete_user(self, selector):
        user_db = self.user.query.filter_by(**selector)
        user_db.delete()

    def delete_all_users(self):
        self.user.query.delete()
    
    def add_user(self, user):
        user_db = User(**user)
        self.db.session.add(user_db)
        # push new user into the db to auto assign primary id
        self.db.session.flush()
        self.db.session.refresh(user_db)

        auth_token = self.user.encode_auth_token(user_db.id)

        return {'id': user_db.id, 'username': user_db.username, 'role': user_db.role_type, 'auth_token':auth_token}

    def decode_auth_token(self, auth_token):
        return self.user.decode_auth_token(auth_token)

    def encode_auth_token(self, user_id):
        return self.user.encode_auth_token(user_id)

    def set_password(self, password):
        self.user.set_password(password=password)

    def check_password(self, plain_password):
        return self.user.check_password(plain_password)

    def commit_action(self):
        self.db.session.commit()
    