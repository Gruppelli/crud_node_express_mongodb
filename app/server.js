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

 /*Rota de teste */
router.get('/', function(req,res){
    res.json({message:'Bem-Vindo a API'});
});

/*TODO - Definição de rotas aqui!!! */

/*Todas as rotas serão definidas com '/api' */
 app.use('/api',router);

 //Iniciando o Servidor (Aplicação);

 app.listen(port);
 console.log('Iniciando a aplicação na porta' + port);
