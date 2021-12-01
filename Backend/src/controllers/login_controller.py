from flask import jsonify, request
from bson.json_util import dumps
from app import app, mongo
from email_controller import Cadastro
import random
import string

#login
@app.route('/login', methods = ["POST"])
def login_user():

    _json = request.json
    _email = _json['email']
    _senha = _json['senha']

    find_user = mongo.db.usuarios.find({'email' : _email, 'senha': _senha})
    not_found = jsonify("usuario não encontrado")
    resp = dumps(find_user)

    if (len(resp)) > 2:
        return resp
    else:
        return not_found

#atualiza senha
@app.route('/updatesenha/<id>', methods=["PUT"])
def update_senha(id):
    _json = request.json
    _senha = _json['senha']
    mongo.db.usuarios.find_one_and_update(
        {'id':int(id)}, {"$set":{'senha': _senha, 'status': 1}})
    resp = jsonify("senha atualizada com sucesso")
    return resp


#esqueceu a senha
@app.route('/redefinesenha', methods = ["POST"])
def redefine_senha():

    _json = request.json
    _email = _json['email']

    cod = 6 
    find_user = mongo.db.usuarios.find({'email' : _email})
    not_found = jsonify("usuario não existe")
    resp = dumps(find_user)
    if (len(resp)) > 2:
        senha = ''.join(random.choice(string.digits) for x in range(cod))
        mongo.db.usuarios.find_one_and_update({'email' : _email}, {"$set":{'senha': senha}})
        #Cadastro.sender_email_1(email, senha)
        Cadastro.sender_email_1( senha)
        return resp
    else:
        return not_found