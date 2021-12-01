from flask import jsonify, request
from flask_pymongo import ObjectId
from app import app, mongo
import pandas as pd


@app.route('/create/anuncio', methods=['POST'])
def create_anuncio():
    if 'anuncio' in request.files:
        anuncio = request.files['anuncio']     
        dfa = pd.read_csv(anuncio)
        data_anuncio = dfa.to_dict(orient="records")
        dfa['visualizacao'] = 1 
        dfa['views'] = 0  
        dfa['id'] = 0 
        dfa['img'] = 'https://th.bing.com/th/id/R.859796299b2bfc24f75d0dc6eb419518?rik=JNrJ%2fvPAhXR8%2fA&riu=http%3a%2f%2fauto-drive.pt%2fwp-content%2fuploads%2f2020%2f04%2f2011-ferrari-599-gto-for-sale-at-mecum-auctions-indy-2020.jpg&ehk=C3LVKXTzYarNgKOUw7NdlVGoljOEYth8V7zI4r%2bl%2bsY%3d&risl=&pid=ImgRaw&r=0'
        x=0
        dfa = pd.DataFrame(data_anuncio) 
        while x < (len(data_anuncio)):
            data_anuncio[x]['visualizacao'] = 1 
            data_anuncio[x]['views'] = 0 
            data_anuncio[x]['id'] = mongo.db.anuncios.count()
            data_anuncio[x]['img'] = 'https://th.bing.com/th/id/R.859796299b2bfc24f75d0dc6eb419518?rik=JNrJ%2fvPAhXR8%2fA&riu=http%3a%2f%2fauto-drive.pt%2fwp-content%2fuploads%2f2020%2f04%2f2011-ferrari-599-gto-for-sale-at-mecum-auctions-indy-2020.jpg&ehk=C3LVKXTzYarNgKOUw7NdlVGoljOEYth8V7zI4r%2bl%2bsY%3d&risl=&pid=ImgRaw&r=0'
            mongo.db.anuncios.insert_one(data_anuncio[x])
            mongo.db.anubkp.insert_one(data_anuncio[x])
            
            x+=1       
        mongo.db.anubkp.update_many(
        {}, 
        { "$unset": {  'cpf_anunciante': ""}}
        )      
    
   

    return 'Arquivo enviado com sucesso!'

#lista todos os anuncios
@app.route('/listar/anuncios', methods = ["GET"])
def lista_anuncio():
    anuncios = []
    for doc in mongo.db.anuncios.find():
        if doc['visualizacao'] == 1:
            anuncios.append({
                '_id': str(ObjectId(doc['_id'])),
                'fabricante': doc['fabricante'],
                'desc_marca': doc['desc_marca'],
                'desc_veiculo': doc['desc_veiculo'],
                'cod_anunciante': doc['cod_anunciante'],
                'ano_fabricacao': doc['ano_fabricacao'],
                'ano_modelo': doc['ano_modelo'],
                'cpf_anunciante': doc['cpf_anunciante'],
                'valor_veiculo': doc['valor_veiculo'],
                'id': doc['id'],
                'email': doc['email'],
                'img': doc['img'],
                'visualizacao': doc['visualizacao'],
                'views': doc['views']
            })
    return jsonify(anuncios)


#lista todos os anuncios sem verificar se esta pausado ou não 
@app.route('/listar/anunciosADM', methods = ["GET"])
def lista_anuncioADM():
    anuncios = []
    for doc in mongo.db.anuncios.find():
            anuncios.append({
                '_id': str(ObjectId(doc['_id'])),
                'fabricante': doc['fabricante'],
                'desc_marca': doc['desc_marca'],
                'desc_veiculo': doc['desc_veiculo'],
                'cod_anunciante': doc['cod_anunciante'],
                'ano_fabricacao': doc['ano_fabricacao'],
                'ano_modelo': doc['ano_modelo'],
                'cpf_anunciante': doc['cpf_anunciante'],
                'valor_veiculo': doc['valor_veiculo'],
                'id': doc['id'],
                'email': doc['email'],
                'img': doc['img'],
                'visualizacao': doc['visualizacao'],
                'views': doc['views']
            })
    return jsonify(anuncios)
#exclui anuncio
@app.route('/anuncios/<id>', methods=['DELETE'])
def deleteAnuncios(id):
       mongo.db.anuncios.delete_one({'_id': ObjectId(id)})
       return jsonify({'message': 'Anuncio excluido'})

@app.route('/atualizar/anuncio/<id>', methods=["PUT"])
def updateAnuncios(id):
     mongo.db.anuncios.update_one({'id': int(id)}, {"$set": {
         'fabricante': request.json['fabricante'],
         'desc_marca': request.json['desc_marca'],
         'desc_veiculo': request.json['desc_veiculo'],
         'cod_anunciante': request.json['cod_anunciante'],
         'ano_fabricacao': request.json['ano_fabricacao'],
         'email': request.json['email'],
         'ano_modelo': request.json['ano_modelo'],
         'valor_veiculo': request.json['valor_veiculo'],
        }})
     return jsonify({'message': 'Anuncio atualizado'})

#lista 5 anuncios para recomendados da pagina home. 
@app.route('/listar5/anuncios', methods = ["GET"])
def lista5anuncio():
    anuncios = []
    for doc in mongo.db.anuncios.find().limit(5):
        if doc['visualizacao'] == 1:
            anuncios.append({
                '_id': str(ObjectId(doc['_id'])),
                'fabricante': doc['fabricante'],
                'desc_marca': doc['desc_marca'],
                'desc_veiculo': doc['desc_veiculo'],
                'cod_anunciante': doc['cod_anunciante'],
                'ano_fabricacao': doc['ano_fabricacao'],
                'ano_modelo': doc['ano_modelo'],
                'cpf_anunciante': doc['cpf_anunciante'],
                'valor_veiculo': doc['valor_veiculo'],
                'id': doc['id'],
                'email': doc['email'],
                'img': doc['img'],
                'visualizacao': doc['visualizacao'],
                'views': doc['views']
            })
    return jsonify(anuncios)

#lista anuncio por cpf do usuario
@app.route('/listar/anuncio/<cpf_anunciante>', methods = ["GET"])
def anuncio(cpf_anunciante):
    anuncios = []
    for doc in mongo.db.anuncios.find({'cpf_anunciante': int(cpf_anunciante)}):
        anuncios.append({    
           '_id': str(ObjectId(doc['_id'])),
           'fabricante' : doc['fabricante'],
           'desc_marca':doc['desc_marca'], 
           'desc_veiculo': doc['desc_veiculo'],
           'cod_anunciante': doc['cod_anunciante'],
           'ano_fabricacao': doc['ano_fabricacao'],
           'ano_modelo': doc[ 'ano_modelo'],
           'cpf_anunciante': doc['cpf_anunciante'],
           'valor_veiculo': doc['valor_veiculo'],
           'email': doc['email'],
           'id': doc['id'],
           'img': doc['img'],
           'visualizacao': doc['visualizacao'],
           'views': doc['views']
        })
    return jsonify(anuncios)




#Contar quantos anuncios o anunciante tem
@app.route('/quantos/anunciosAtivos/<cpf_anunciante>', methods = ["GET"])
def quantos(cpf_anunciante):

    anuncios = mongo.db.anuncios.find({'cpf_anunciante': int(cpf_anunciante), "visualizacao": 1}).count()
    return jsonify(anuncios)



#Contar quantos anuncios no total o sistema tem 
@app.route('/quantos/anuncios', methods = ["GET"])
def quantosGeral():

    anuncios = mongo.db.anuncios.find().count()
    return jsonify(anuncios)

    
#lista quantos anuncios ativos temos
@app.route('/ativos/anuncios', methods = ["GET"])
def anunciosAtivos():
 
    anuncios = mongo.db.anuncios.find({"visualizacao": 1}).count()   
    return jsonify(anuncios)


#lista quantos anuncios pausados temos
@app.route('/pausados/anuncios', methods = ["GET"])
def aanunciosPausados():
 
    anuncios = mongo.db.anuncios.find({"visualizacao": 0}).count()   
    return jsonify(anuncios)


#lista quantos anuncios despausados temos
@app.route('/quantas/views', methods = ["GET"])
def quantasViews():
 
    anuncios = mongo.db.anuncios.find({"views"}).count()   
    return jsonify(anuncios)


  
  
#Lista anuncio especifico
@app.route('/anuncio/<id>', methods=['GET'])
def getAnuncio(id):
  anuncio = mongo.db.anuncios.find_one({'id': int(id)})
  return jsonify({
     '_id': str(ObjectId(anuncio['_id'])),
      'fabricante' : anuncio['_fabricante'],
      'desc_marca': anuncio['_desc_marca'], 
      'desc_veiculo': anuncio['desc_veiculo'],
      'cod_anunciante': anuncio['cod_anunciante'],
      'ano_fabricacao': anuncio['ano_fabricacao'],
      'ano_modelo': anuncio[ 'ano_modelo'],
      'cpf_anunciante': anuncio['cpf_anunciante'],
      'valor_veiculo': anuncio['valor_veiculo']
     
  })