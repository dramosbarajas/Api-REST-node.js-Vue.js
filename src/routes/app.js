/*
**Fichero para las rutas de la aplicación
*/
const express = require('express');
const router = express.Router();
var path = require("path");

router.get(['/',"", "/login"],function(req,res){
    res.sendFile(path.join(__dirname, '../public', 'login.html'));
  });

router.get('/app',function(req,res){
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });

  module.exports = router;