
const mongoose = require('mongoose');
const passport = require('passport');
const Respuesta = mongoose.model('Respuestas');
var db;
module.exports.register = (req, res, next) => {
    var respuesta = new Respuesta();
    respuesta.id = req.body.id;
    respuesta.texto = req.body.texto;
    
    respuesta.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if(err.code == 11000)
            {
                res.status(422).send(['Esta respuesta ya ha sido registrada.'])
            }
            //error handling
        }
 
    });
}

module.exports.obtain = (req, res, next) => {
    var respuesta = new Respuesta();
    console.log("id " + req.body.id);
    respuesta=Respuesta.findOne({ id: req.body.id },
        (err, respuesta) => {
            if (err)
            res.send(err);
            // unknown user
            else if (!respuesta)
               res.send('No existe esa respuesta');
            // wrong password
            else
            res.send(respuesta);
 
    });

}

module.exports.obtainall = (req, res, next) => {
    var respuesta = new Respuesta();
    
    respuesta=Respuesta.find({ },
        (err, respuesta) => {
            if (err)
            res.send(err);
            // unknown user
            else if (!respuesta)
               res.send('No existe esa respuesta');
            // wrong password
            else
            res.send(respuesta);
 
    });

}

module.exports.remove = (req, res, next) => {
    var respuesta = new Respuesta();
    console.log("id " + req.body.id);
    respuesta=Respuesta.deleteOne({ id: req.body.id },
        (err, respuesta) => {
            if (err)
            res.send(err);
            // unknown user
            else if (!respuesta)
               res.send('No existe esa respuesta');
            // wrong password
            else
            res.send('respuesta eliminada');
 
    });

}