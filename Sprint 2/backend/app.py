from flask import Flask, request, jsonify, send_from_directory
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS
import os
import pandas as pd
from pymongo import MongoClient

DIRETORIO = "C:\\Users\\Pedro\\Documents\\API-5semestre-main\\frontend\\teste"

app = Flask(__name__)

app.config['MONGO_URI']='mongodb+srv://jsoeiro:1234@bycardb.lrp4p.mongodb.net/dbycar'
mongo = PyMongo(app)
CORS(app)
db = mongo.db.anuncios


#AQUI
@app.route('/anuncios', methods=['POST'])
def createAnuncio():
     id = db.insert({
         'name': request.json['name'],
         'by': request.json['by'],
         'price': request.json['price'],
         'cpf': request.json['cpf'],
         'color': request.json['color'],
         'endereço': request.json['endereço'],
         'troca': request.json['troca'],
         'combustivel': request.json['combustivel'],
         'km': request.json['km'],
         'model': request.json['model'],
         'year': request.json['year'],
         'img': request.json['img'],
     })
  
     return jsonify(str(ObjectId(id)))

@app.route('/anuncios', methods=['GET'])
def getAnuncios():
    anuncios = []
    for doc in db.find():
        anuncios.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'by': doc['by'],
            'price': doc['price'],
            'cpf': doc['cpf'],
            'color': doc['color'],
            'endereço': doc['endereço'],
            'troca': doc['troca'],
            'combustivel': doc['combustivel'],
            'km': doc['km'],
            'model': doc['model'],
            'year': doc['year'],
            'img': doc['img'],
           
        })
    return jsonify(anuncios)

@app.route('/anuncios/<id>', methods=['GET'])
def getAnuncio(id):
    anuncios = db.find_one({'_id': ObjectId(id)})
    print(anuncios)
    return jsonify({
      '_id': str(ObjectId(anuncios['_id'])),
      'name': anuncios['name'],
      'by': anuncios['by'],
      'price': anuncios['price'],
      'cpf': anuncios['cpf'],
      'color': anuncios['color'],
      'endereço': anuncios['endereço'],
      'troca': anuncios['troca'],
      'combustivel': anuncios['combustivel'],
      'km': anuncios['km'],
      'model': anuncios['model'],
      'year': anuncios['year'],
      'img': anuncios['img'],
  })

@app.route('/anuncios/<id>', methods=['DELETE'])
def deleteAnuncios(id):
       db.delete_one({'_id': ObjectId(id)})
       return jsonify({'message': 'Anuncio excluido'})

@app.route("/anuncios/<id>", methods=['PUT'])
def updateAnuncios(id):
     print(request.json)
     db.update_one({'_id': ObjectId(id)}, {"$set": {
         'name': request.json['name'],
         'by': request.json['by'],
         'price': request.json['price'],
         'cpf': request.json['cpf'],
         'color': request.json['color'],
         'endereço': request.json['endereço'],
         'troca': request.json['troca'],
         'combustivel': request.json['combustivel'],
         'km': request.json['km'],
         'model': request.json['model'],
         'year': request.json['year'],
         'img': request.json['img'],
     }})
     return jsonify({'message': 'Anuncio atualizado'})

@app.route("/arquivos", methods=['GET'])
def lista_arquivos():
    arquivos = []
     
   
    for nome_do_arquivo in os.listdir(DIRETORIO):
        endereco_do_arquivo = os.path.join(DIRETORIO, nome_do_arquivo)

        if(os.path.isfile(endereco_do_arquivo)):
            arquivos.append(nome_do_arquivo)

    return jsonify(arquivos)

@app.route("/arquivos/<nome_do_arquivo>", methods=['GET'])
def get_arquivo(nome_do_arquivo):
    return send_from_directory(DIRETORIO, nome_do_arquivo, as_attachment=True)


@app.route("/arquivos/", methods=['POST'])
def post_arquivo():
    arquivo = request.files.get("meuArquivo")

    print(arquivo)
    nome_do_arquivo = arquivo.filename
    arquivo.save(os.path.join(DIRETORIO, nome_do_arquivo))

    return '', 201

    

@app.route('/create', methods=['POST'])
def create():
    if 'arquivo_do_cara' in request.files:
        arquivo_do_cara = request.files['arquivo_do_cara']
        data = pd.read_csv(arquivo_do_cara)
        data.reset_index(inplace=True)
        data_dict = data.to_dict("records")
        df = pd.DataFrame(data_dict)
       
        collection.insert_many(data_dict)

    return 'Arquivo enviado com sucesso!'

if __name__ == "__main__":
  app.run(debug=True)