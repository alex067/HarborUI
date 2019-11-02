import os
from app.repository import Repository
from app.repository.sqlite import SqliteRepository

DB_TYPE = os.getenv('DB_TYPE', 'SQLITE')

if(DB_TYPE == 'SQLITE'):
    adapter = SqliteRepository

class UserService(object):
    def __init__(self, repo_client=Repository(adapter=adapter)):
        self.client = repo_client

    '''
    Retrieval functions
    '''
    def find_all_users(self):
        users = self.client.find_all_users()
        return users

    def find_user(self, selector):
        user = self.client.find_user(selector)
        return user
    
    '''
    Removal functions
    '''
    def delete_user(self, selector, auto_commit=False):
        self.client.delete_user(selector)

        if(auto_commit):
            self.client.commit_action()

    def delete_all_users(self, auto_commit=False):
        self.client.delete_all_users()

        if(auto_commit):
            self.client.commit_action()
    
    '''
    Add functions
    '''
    def add_user(self, auto_commit=False, **kwargs, ):
        new_user = self.client.add_user(kwargs)

        if(auto_commit):
            self.client.commit_action()

        return new_user

    '''
    Authentication functions
    '''
    def decode_auth_token(self, auth_token):
        decoded_token = self.client.decode_auth_token(auth_token)
        return decoded_token

    def encode_auth_token(self, user_id):
        encoded_token = self.client.encode_auth_token(user_id)
        return encoded_token

    def set_password(self, password):
        hash_password = self.client.set_password(password)
        return hash_password

    def check_password(self,plain_password):
        validate_password = self.client.check_password(plain_password)
        return validate_password

    '''
    DB specific functions
    '''
    def commit_action(self):
        self.client.commit_action()
    