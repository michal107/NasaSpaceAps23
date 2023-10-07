from flask import Flask,request,render_template, redirect, url_for
import sqlalchemy_utils
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_migrate import Migrate
import sqlite3

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'
app.config['SQLALCHEMY_TRACK_MODIFICATION'] = False
db = SQLAlchemy(app)

class User(db.Model):
     id = db.Column(db.Integer, primary_key=True, unique=True, autoincrement=True)
     name = db.Column(db.String(20), unique=True)
     mail = db.Column(db.String(50), unique=True)
     pwd = db.Column(db.String(50))

@app.route('/')
def begin():
    return render_template("login.html")

@app.route('/form_login',methods=['POST','GET'])
def login():
    name1=request.form['username']
    pwd=request.form['password']
    if name1 not in db:
         return render_template('login.html',info='Invalid User')
    else:
        if db[name1]!=pwd:
            return render_template('login.html',info='Invalid Password')
        else:
	         return render_template('home.html',name=name1)
        
@app.route('/register',methods=['POST'])
def register():
    name1=request.form['username']
    pwd=request.form['password']
    user_email=request.form['mail']
    if name1 in db or user_email in db:
         return render_template('register.html',info='User name or email already taken')
    else:
        post = db(name = name1, password = pwd, email = user_email)
        db.session.add(post)
        db.session.commit()
        return redirect(url_for('login.html'))
    
if __name__ == '__main__':
    app.run(host='0.0.0.0')