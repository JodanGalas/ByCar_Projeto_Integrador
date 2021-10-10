
from envio_email import Email


#'/login' | post | recebe email e senha
#e verifica se existe no banco | se existe, retorna a linha
@app.route("/login", methods=["POST"])
def teste():
    Email.sender_email()


#'/updatepassword/id'
#| post | recebe usuario com nova senha | atualiza no banco
#coluna senha ganha um cod(senha) aleatoria que tb vai no email
#depois o user atualiza
#@app.route("/logs", methods=["POST"])
#def texto():
#    pass


#'/upload' | post | recebe o arquivo | lê e joga no banco
#@app.route("/logs", methods=["POST"])
#def texto():
#    pass

#'/emailvalidation/email' | get | recebe o email do usuario
#| cria codigo de verificaçao e envia por email
#@app.route('/star', methods=['GET'])
#def texto():
#    pass

#'/codevalidation/code' | get |
# recebe o codigo inserido | verifica se o codigo é igual
#@app.route('/star', methods=['GET'])
#def texto():
#    pass