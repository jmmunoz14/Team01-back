const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true},(err) => {
    if(!err) 
    {
        console.log('MongoDB conexion satisfactoria');
    }
    else{
        console.log('error en la conexion' + JSON.stringify(err, undefined, 2));
    }
});

require('./user.model');
require('./preguntas.model');
require('./respuestas.model');
require('./partida');
require('./chat');
require('./blog');


