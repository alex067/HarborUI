import sys
from flask import Flask 
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from cronui import db

class User(UserMixin, db.Model):
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

class LinuxUser(db.Model):
    __tablename__ = "linuxuser"

    uid = db.Column(db.Integer, primary_key=True)
    linux_username = db.Column(db.String(40), nullable=False, unique=True)

    def __repr__(self):
        return "<LinuxUser {}>".format(self.linux_username)

class UserMapping(db.Model):
    __tablename__ = "usermapping"
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,  db.ForeignKey('user.id'), nullable=False)
    linux_uid = db.Column(db.Integer,  db.ForeignKey('linuxuser.uid'), nullable=False)

    user = db.relationship('User', backref=db.backref('usermapping', lazy=True))
    linuxuser = db.relationship('LinuxUser', backref=db.backref('usermapping', lazy=True))

    def __repr__(self):
        return "<User {}> -> <LinuxUser {}>".format(self.user_id, self.linux_uid)

class Jobs(db.Model):
    __tablename__ = "jobs"

    linux_uid = db.Column(db.Integer,  db.ForeignKey('linuxuser.uid'), nullable=False)
    user_id = db.Column(db.Integer,  db.ForeignKey('user.id'), nullable=False)
    job_id = db.Column(db.Integer, primary_key=True)
    job_name = db.Column(db.String(120), nullable=False)
    schedule = db.Column(db.String(40), nullable=False)
    execution_id = db.Column(db.Integer, db.ForeignKey('execution.id'), nullable=False)
    execution = db.Column(db.String(120), nullable=False)

    user = db.relationship('User', backref=db.backref('jobs', lazy=True))
    linuxuser = db.relationship('LinuxUser', backref=db.backref('jobs', lazy=True))
    execution = db.relationship('Execution', backref=db.backref('jobs', lazy=True))

    def __repr__(self):
        return "<Job {}, {}>, <Schedule {}>, <Execution Type {}>, <Execution {}>".format(
            self.job_id, self.job_name, self.schedule, self.execution_id, self.execution
        )

class Execution(db.Model):
    __tablename__ = "execution"

    id = db.Column(db.Integer, primary_key=True, unique=True)
    execution_type = db.Column(db.String, unique=True, nullable=False)
    
    def __repr__(self):
        return "<Execution {}, {}>".format(self.id, self.execution_type)
