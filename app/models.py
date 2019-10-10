from app import db

class User(db.Model):
    '''
    Many-to-Many relationship with LinuxUser model.
    '''
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), unique=True, nullable=False)
    fullname = db.Column(db.String(120), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=False, nullable=True)
    password = db.Column(db.String(128))
    role_type = db.Column(db.Integer, db.ForeignKey('roles.id'))
    
    def __repr__(self):
        return "<User {}, {}>".format(self.id, self.username)

class Roles(db.Model):
    __tablename__ = "roles"

    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(40), unique=True, nullable=False)
    level = db.Column(db.Integer, unique=True, nullable=False)