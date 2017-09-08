/*
 * Arquivo: server.js
 * Ddescrição:Levantar o serviço node.js para poder
 * executar a aplicação e a API através do Express.js
 * Author:Gabriel Gruppelli
 * Data de criação: 06/09/2017
 */

 //Base do setup da aplicação:

 /*Chamada das Packages aplicação*/

 var express    = require('express');//chamando o pacote express
 var app        = express();//Definição aplicação express
 var bodyParser = require('body-parser');//chamando o pacote body-parser
 

 /*Configuração da variavel 'app' para usar o 'bodyParser()' */

 app.use(bodyParser({extended:true}));
 app.use(bodyParser.json());

 /*Definição da porta onde será executada a aplicação */

 var port = process.env.PORT || 8000;

//Rotas da API

 /*'router' irá pegar as instancias das rotas do express */
 var router = express.Router();

 /*Middlerware para usar em todos os requests enviados a API-Mensagem Padão */
 router.use(function(req,res,next){
    console.log('Algo está acontecendo aqui.....');
    next();//próxima rota
 });

 /*Rota de teste */
 router.get('/', function(req,res){
    res.json({message:'Bem-Vindo a API'});
 });

 router.route('/usuarios').post(function(req, res){

        var usuario = new Usuario();

        //campos do usuario (que virá do request)
        usuario.nome = req.body.nome;
        usuario.login = req.body.login;
        usuario.senha = req.body.senha;

        usuario.save(function(error) {
            if(error)
                res.send(error);
            res.json({ message: 'Usuário criado!' });
        });
     });

 router.route('/usuarios').get(function(req, res){

     Usuario.find(function(err, usuarios){
         if(err)
             res.send(err);
         res.json(usuarios);
     })

 });

 router.route('/usuarios/:usuario_id').get(function(req,res){

     Usuario.findById(req.params.usuario_id, function(error, usuario){
         if(error)
             res.send(error);
         //Resposta
         res.json(usuario);
     });
 });

 router.route('/usuarios/:usuario_id').put(function(req,res) {

     Usuario.findById(req.params.usuario_id, function(error, usuario) {
         if(error)
             res.send(error);
         //Salva dados local
         usuario.nome = req.body.nome;
         usuario.login = req.body.login;
         usuario.senha = req.body.senha;

         //Salva no banco
         usuario.save(function(error) {
             if(error)
                 res.send(error);

             res.json({ message: 'Usuário Atualizado!' });
         });
     });
 });

 router.route('/usuarios/:usuario_id').delete(function(req,res) {

     Usuario.remove({_id: req.params.usuario_id}, function(error) {
         if(error)
             res.send(error);

         res.json({ message: 'Usuário excluído com Sucesso! '});
     });
 });

 /*Todas as rotas serão definidas com '/api' */
 app.use('/api',router);

 //Iniciando o Servidor (Aplicação);

 app.listen(port);
 console.log('Iniciando a aplicação na porta' + port);

 //Configuração Base da aplicação

 var Usuario = require('./models/usuario');

 var mongoose = require('mongoose');

 var DB_URI = 'mongodb://admin:123456@ds127564.mlab.com:27564/node-api';
 var options = { promiseLibrary: global.Promise, useMongoClient: true};

 mongoose.Promise = global.Promise;

 mongoose.connect(DB_URI,options);







