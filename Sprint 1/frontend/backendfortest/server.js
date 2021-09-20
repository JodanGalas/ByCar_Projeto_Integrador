const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Routes = express.Router();
const PORT = 4000;

let db = {
    id: 1,
    name: 'fabricio',
    email: 'fabricio@gmail.com',
    password: '123',
    first_access: 0,
    code: ''
}

let code = '555000';


app.use(cors());
app.use(bodyParser.json());



Routes.route('/login').post(function (req, res) {       //VERIFICA SE O E-MAIL E SENHA INSERIDOS
    //EXISTEM NO BANCO
    let verify = req.body
    if (verify.email === db.email && verify.password === db.password) {
        res.status(200).send(db);
    }
    else {
        res.status(200).json({ 'login': 'FAILED' });
    }
});


Routes.route('/updatepassword/:id').post(function (req, res) {  //ATUALIZA A SENHA DO USUARIO E ALTERA O 
    //CAMPO 'first_access' PARA 1
    let verify = req.body
    if (verify.email === db.email && verify.password !== db.password) {
        db.password = verify.password;
        db.first_access = 1;
        db.code = ''
        res.status(200).send(db);
    }
    else {
        res.status(200).json({ 'updatepassword': 'FAILED' });
    }
})


Routes.route('/emailvalidation/:email').get(function (req, res) {   //CRIA O CODIGO DE VERIFICAÇÃO,
                                                                    //ENVIA O E-MAIL E ARMAZENA O CODIGO
    let verify = req.params
    if (verify.email === db.email) {
        db.code = code
        res.status(200).json({ 'emailvalidation': 'SUCCESS' });
    }
    else {
        res.status(200).json({ 'emailvalidation': 'FAILED' });
    }
})


Routes.route('/codevalidation/:code').get(function (req, res) {   //VERIFICA SE O CODIGO INSERIDO É O
                                                                    //MESMO CODIGO ARMAZENADO
    let verify = req.params
    if (verify.code === db.code) {
        res.status(200).json(db);
    }
    else {
        res.status(200).json({ 'codevalidation': 'FAILED' });
    }
})

app.use('/bycar', Routes);


app.listen(PORT, function () {
    console.log('server rodando na porta: ' + PORT);
});