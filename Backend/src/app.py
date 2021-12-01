from flask import Flask
from flask_cors import CORS
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb+srv://jsoeiro:1234@bycardb.lrp4p.mongodb.net/dbycar' #conexao com o mongo 
mongo = PyMongo(app)
CORS(app)