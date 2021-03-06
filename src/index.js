const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require("path");

//SETTINGS 
//Si no existe un puerto en las variables de enviroment utiliza el puerto 3000.
app.set('port', process.env.PORT || 3000 )
app.set('dbport', process.env.PORT || 27017)

//MIDDLEWARES
app.use(morgan('dev'))
app.use(express.json());

//ROUTES
app.use('/api',require("./routes/task"))
app.use('',require("./routes/app"))

//Static files
app.use(express.static(__dirname + '/public'))
//CONNECT DB AND SERVER LISTENING 
mongoose.connect(`mongodb://localhost:${app.get('dbport')}/mevn-database`)
    .then(db => app.listen(app.get('port'), () => {
        console.log(`DB OK!! - Server on port ${app.get('port')}`);
    }))
    .catch(err => console.log(`Ha ocurrido un error al conectar a la base de datos y arrancar el servidor ${err}`));

