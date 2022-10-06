import os
import re
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)
# from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
import psycopg2
from config import (protocol,username,password,host,port,database_name)


app = Flask(__name__)
rds_connection_string = f'{protocol}://{username}:{password}@{host}:{port}/{database_name}'
app.config['SQLALCHEMY_DATABASE_URI'] =rds_connection_string
# db = SQLAlchemy(app)
conn = psycopg2.connect(rds_connection_string, sslmode='require')


def get_summary():
    cur = conn.cursor()
    cur.execute('SELECT * FROM summary;')
    summary = cur.fetchall()
    return summary
def get_data():
    cur = conn.cursor()
    cur.execute('SELECT * FROM disaster_data;')
    disaster_data=cur.fetchall()
    return disaster_data

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/summary")
def summary():
    summary = get_summary()
    return jsonify(summary)

@app.route("/disaster")
def disaster():
    disaster = get_data()
    return jsonify(disaster)

if __name__ == "__main__":
    app.run(debug=True)