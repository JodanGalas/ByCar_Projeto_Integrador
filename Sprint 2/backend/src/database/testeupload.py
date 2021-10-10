from flask import Flask, request
from flask_pymongo import PyMongo


app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb+srv://jsoeiro:1234@bycardb.lrp4p.mongodb.net/dbycar' #conexao com o mongo 
mongo = PyMongo(app)

#credenciais pra acessarmos das nossas maquinas
#mongodb+srv://jsoeiro:1234@bycardb.lrp4p.mongodb.net/dbycar
#mongodb+srv://jodang:1234@bycardb.lrp4p.mongodb.net/dbycar
#mongodb+srv://rodrigoflx:1234@bycardb.lrp4p.mongodb.net/dbycar
#mongodb+srv://fabricio:1234@bycardb.lrp4p.mongodb.net/dbycar


@app.route('/')
def index():
    return '''
        <form method="POST" action="/create" enctype="multipart/form-data">
            <input type="text" name="username">
            <input type="file" name="arquivo_do_cara">
            <input type="submit">
        </form>
    '''

@app.route('/create', methods=['POST'])
def create():
    if 'arquivo_do_cara' in request.files:
        arquivo_do_cara = request.files['arquivo_do_cara']
        mongo.save_file(arquivo_do_cara.filename, arquivo_do_cara)
        mongo.db.usuarios.insert({'username' : request.form.get('User que upou'), 'Nome do arquivo' : arquivo_do_cara.filename})

    return 'Arquivo enviado com sucesso!'
app.run(host='0.0.0.0')