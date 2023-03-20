import os
from flask import Flask, jsonify, request, Response
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
app.config["CORS_SUPPORTS_CREDENTIALS"] = True

@app.route('/')
def index():
    return '<p>안녕 이모작</p>'
