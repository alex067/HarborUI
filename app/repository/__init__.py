# main ORM 
# all transactions must be commited outside of speciifc ORM 

class Repository(object):
    def __init__(self, adapter=None):
        self.client = adapter()
    
    def find_all_users(self):
        return self.client.find_all_users()

    def find_user(self, selector):
        return self.client.find_user(selector)
    
    def delete_user(self, selector):
        return self.client.delete_user(selector)

    def delete_all_users(self):
        return self.client.delete_all_users()
    
    def add_user(self, selector):
        return self.client.add_user(selector)

    def decode_auth_token(self, auth_token):
        return self.client.decode_auth_token(auth_token)

    def encode_auth_token(self, user_id):
        return self.client.encode_auth_token(user_id)

    def set_password(self, password):
        return self.client.set_password(password)

    def check_password(self, hash_password, plain_password):
        return self.client.check_password(hash_password, plain_password)

    def commit_action(self):
        '''
        Only available to sqlite, postgres
        '''
        return self.client.commit_action()