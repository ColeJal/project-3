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
    cur.execute('SELECT * FROM larger_summary;')
    summary = cur.fetchall()
    return summary
def get_data():
    cur = conn.cursor()
    cur.execute('SELECT * FROM disasters;')
    disaster_data=cur.fetchall()
    return disaster_data
def get_decade():
    cur = conn.cursor()
    cur.execute('SELECT * FROM decade_breakdown;')
    decade = cur.fetchall()
    return decade
def get_continent_bd():
    cur = conn.cursor()
    cur.execute('SELECT * FROM continent_breakdown;')
    continent_breakdown = cur.fetchall()
    return continent_breakdown
def get_continent_decade():
    cur = conn.cursor()
    cur.execute('SELECT * FROM continent_decade;')
    continent_decade = cur.fetchall()
    return continent_decade




@app.route("/")
def home():
    return render_template('index2.html')

@app.route("/summary")
def summary():
    summary = get_summary()
    return jsonify(summary)

@app.route("/disaster")
def disaster():
    disaster = get_data()
    return jsonify(disaster)

@app.route("/decade")
def decade():
    decade = get_decade()
    return jsonify(decade)

@app.route("/climate")
def climate():
    return render_template('climate.html')

@app.route("/world")
def world():
    return render_template('world.html')
@app.route("/continent_breakdown")
def continent_breakdown():
    continent_breakdown=get_continent_bd()
    return jsonify(continent_breakdown)
@app.route("/continent_decade")
def continent_decade():
    continent_decade=get_continent_decade()
    return jsonify(continent_decade)


if __name__ == "__main__":
    app.run(debug=True)