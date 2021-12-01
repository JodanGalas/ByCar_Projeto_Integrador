from flask import jsonify, request
from flask_pymongo import ObjectId
from bson.json_util import dumps
from app import app, mongo
from email_controller import Cadastro
import pandas as pd
import random
import string



@app.route('/create/user', methods=['POST'])
def create():
    if 'arq' in request.files: 
        arquivo = request.files['arq']     
        df = pd.read_csv(arquivo)
        data = df.to_dict(orient="records")
        cod = 6

        df['id'] = 0
        df['senha'] = 0
        df['status'] = 0
        df['cod'] = 0
        df['atividade'] = 1
        df.reset_index(inplace=True)
        x=0
        df = pd.DataFrame(data)
        while x < (len(data)):
            data[x]['id'] = mongo.db.usuarios.count()
            data[x]['senha'] = ''.join(random.choice(string.digits) for x in range(cod))
            data[x]['status'] = 0
            data[x]['cod'] = 0
            data[x]['atividade'] = 0

            email = data[x]['email']
            senha = data[x]['senha']
            print(email)
            print(senha)
            Cadastro.sender_email(email, senha)
            mongo.db.usuarios.insert_one(data[x])
            mongo.db.dadosbkp.insert_one(data[x])

            x+=1 
        mongo.db.dadosbkp.update_many(
        {}, 
        { "$unset": {  'nome': "", 'telefone': "",'endereco': "", 'senha': "", 'status': "", 'cod': "", 
        'atividade': "", 'cpf': "" }}
        )      
     

       
        return 'Arquivo enviado com sucesso!'
    
#lista todos os usuarios
@app.route('/listar/usuarios', methods = ["GET"])
def users():
    users = []
    for usuario in mongo.db.usuarios.find():
        if usuario['cod'] == 0:
            users.append({
            '_id' : str(ObjectId(usuario['_id'])),
            'nome' : usuario['nome'],
            'cpf' : usuario['cpf'],
            'email' : usuario['email'],
            'telefone' : usuario['telefone'],
            'endereco' : usuario['endereco'],
            'id': usuario['id'],
            'senha' : usuario['senha'],
            'status' : usuario['status'],
            'cod' : usuario['cod'],
            'atividade' : usuario['atividade']})
        
    return jsonify(users)


#Quantos usuarios tem no total 
@app.route('/quantos/usuarios', methods = ["GET"])
def quantosUsers():
    
    users = mongo.db.usuarios.find({"cod": 0}).count()
    return jsonify(users)

#lista usuario por id
@app.route('/listar/usuario/<id>', methods = ["GET"])
def user(id):
    usuario = mongo.db.usuarios.find_one({'id':int(id)})
    return ({
            '_id' : str(ObjectId(usuario['_id'])),
            'nome' : usuario['nome'],
            'cpf' : usuario['cpf'],
            'email' : usuario['email'],
            'telefone' : usuario['telefone'],
            'endereco' : usuario['endereco'],
            'id': usuario['id'],
            'senha' : usuario['senha'],
            'status' : usuario['status'],
            'cod' : usuario['cod'],
            'atividade' : usuario['atividade']})

#atualiza usuario
@app.route('/atualizar/usuario/<id>', methods=["PUT"])
def update_user(id):
    _json = request.json
    _nome = _json['nome']
    _cpf = _json['cpf']
  
    _email = _json['email']
    _telefone = _json['telefone']
    _endereco = _json['endereco']
   
    find_user =mongo.db.usuarios.find_one_and_update(
        {'id':int(id)}, {"$set":{
                                'nome' : _nome,
                                'cpf': _cpf, 
                                
                                'email': _email,
                                'telefone': _telefone,
                                'endereco': _endereco,}})
   
    resp = dumps(find_user)
    print(resp)
    return resp
#exclui usuario
@app.route('/deletar/usuario/<id>', methods=["PUT"])
def delete_user(id):

    mongo.db.usuarios.find_one_and_delete({'id':int(id)})
    resp = jsonify("usuario deletado ")
    return resp