from flask import Flask,request,render_template, redirect, url_for, Response
import sqlalchemy_utils
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_migrate import Migrate
import sqlite3
import calculate
import math

loggedInUser = None

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
    return render_template("home.html")

@app.route('/go_login')
def go_login():
     return render_template("login.html")

@app.route('/go_register')
def go_register():
     return render_template('register.html')

@app.route('/go_forgot_pwd')
def go_forgot_pwd():
     return render_template('forgot_pwd.html')

@app.route('/go_transport')
def go_transport():
     return render_template('transport.html')

@app.route('/go_recomend')
def go_recomend():
     return render_template('recomendations.html')

@app.route('/go_discover')
def go_discover():
     return render_template('discover.html')

@app.route('/go_blog')
def go_blog():
     return render_template('blog.html')

@app.route('/go_insurance')
def go_insurance():
     return render_template('insurance.html')

@app.route('/go_travel_law')
def go_travel_law():
     return render_template('travel_law.html')

@app.route('/go_conditions')
def go_conditions():
     return render_template('conditions.html')

@app.route('/go_about')
def go_about():
     return render_template('about.html')

@app.route('/go_hotel')
def go_hotel():
     return render_template('hotel.html')

@app.route('/go_mercury')
def go_mercury():
     return render_template('planets/mercury.html')

@app.route('/go_venus')
def go_venus():
     return render_template('planets/venus.html')

@app.route('/go_mars')
def go_mars():
     return render_template('planets/mars.html')

@app.route('/go_jupiter')
def go_jupiter():
     return render_template('planets/jupiter.html')

@app.route('/go_saturn')
def go_saturn():
     return render_template('planets/saturn.html')

@app.route('/go_uranus')
def go_uranus():
     return render_template('planets/uranus.html')

@app.route('/go_neptune')
def go_neptune():
     return render_template('planets/neptune.html')

@app.route('/read_data')
def read_text_file():
    file_path = 'Code/data.txt'
    try:
        with open(file_path, 'r') as file:
            file_contents = file.read()
        return Response(file_contents, mimetype='text/plain')
    except FileNotFoundError:
        return "Plik nie znaleziony", 404

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