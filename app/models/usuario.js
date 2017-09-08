/*
 *Arquivo:usuario.js
 *Author:Gabriel Gruppelli
 *Description:Arquivo onde sera tratado o modelo de projeto.
 *Definição dos esquemas a serem utilizados na Base de Dados(MongoDB) 
 *Data:06/09/2017
 */

 var mongoose = require('mongoose');
 var Schema = mongoose.Schema;

 var UsuarioSchema = new Schema({
     nome:  String,
     login: String,
     senha: String
 });

 module.exports = mongoose.model('Usuario',UsuarioSchema);

