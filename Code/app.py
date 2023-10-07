from flask import Flask,request,render_template 
import sqlalchemy_utils
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from flask_migrate import Migrate

app = Flask(__name__)


@app.route('/')
def begin():
    return render_template("login.html")
database={'1':'1'}

# @app.route('/threejs') # JUST FOR TESTING
# def threejs():
#     return render_template('threejstest.html')

@app.route('/form_login',methods=['POST','GET'])
def login():
    name1=request.form['username']
    pwd=request.form['password']
    if name1 not in database:
         return render_template('login.html',info='Invalid User')
    else:
        if database[name1]!=pwd:
            return render_template('login.html',info='Invalid Password')
        else:
	         return render_template('home.html',name=name1)

if __name__ == '__main__':
    app.run(host='0.0.0.0')