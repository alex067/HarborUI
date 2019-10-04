from app import db

class User(db.Model):
    '''
    Many-to-Many relationship with LinuxUser model.
    '''
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), unique=True, nullable=False)
    firstname = db.Column(db.String(100), unique=False, nullable=True)
    lastname = db.Column(db.String(100), unique=False, nullable=True)
    email = db.Column(db.String(100), unique=False, nullable=True)
    password = db.Column(db.String(120), unique=False, nullable=False)
    
    def __repr__(self):
        return "<User {}, {}>".format(self.id, self.username)