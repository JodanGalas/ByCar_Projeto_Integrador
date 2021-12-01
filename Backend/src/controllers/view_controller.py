from flask import jsonify, request
from app import app, mongo


@app.route('/atualizar/view/<id>', methods=["POST"])
def updateViewAnuncio(id):

     mongo.db.anuncios.update_one({'id': int(id)}, {"$set": {'views': request.json['views'] + 1}})
     view = mongo.db.anuncios.find_one({'id': int(id)})
     print(view)
     return jsonify({'views': view['views']})


@app.route('/atualizar/visu/<id>', methods=["POST"])
def updateVisuAnuncio(id):

     mongo.db.anuncios.update_one({'id': int(id)}, {"$set": {'visualizacao': request.json['visualizacao']}})
     visualizacao = mongo.db.anuncios.find_one({'id': int(id)})
     print(visualizacao)
     return jsonify({'visualizacao': visualizacao['visualizacao']})