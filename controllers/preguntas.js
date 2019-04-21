
const mongoose = require('mongoose');
const passport = require('passport');
const Pregunta = mongoose.model('Preguntas');
var db;
module.exports.register = (req, res, next) => {
    var pregunta = new Pregunta();
    pregunta.id = req.body.id;
    pregunta.materia = req.body.materia;
    pregunta.enunciado = req.body.enunciado;
    pregunta.respuestaID = req.body.respuestaID;
    pregunta.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if(err.code == 11000)
            {
                res.status(422).send(['Esta Pregunta ya ha sido registrada.'])
            }
            //error handling
        }
 
    });
}


module.exports.obtain = (req, res, next) => {
    var pregunta = new Pregunta();
    console.log("materia " + req.body.materia);
    pregunta=Pregunta.find({ materia: req.body.materia },
        (err, pregunta) => {
            if (err)
            res.send(err);
            // unknown user
            else if (!pregunta)
               res.send('No existen preguntas de esta materia');
            // wrong password
            else
            res.send(pregunta);
 
    });

}

module.exports.obtainalles = (req, res, next) => {
    var pregunta = new Pregunta();
    
    pregunta=Pregunta.find({idioma:'es' },
        (err, pregunta) => {
            if (err)
            res.send(err);
            // unknown user
            else if (!pregunta)
               res.send('No existen preguntas de esta materia');
            // wrong password
            else
            res.send(pregunta);
 
    });

}


module.exports.obtainallen = (req, res, next) => {
    var pregunta = new Pregunta();
    
    pregunta=Pregunta.find({ idioma:'en'},
        (err, pregunta) => {
            if (err)
            res.send(err);
            // unknown user
            else if (!pregunta)
               res.send('No existen preguntas de esta materia');
            // wrong password
            else
            res.send(pregunta);
 
    });

}

module.exports.remove = (req, res, next) => {
    var pregunta = new Pregunta();
    console.log("id " + req.body.id);
    pregunta=Pregunta.deleteOne({ id: req.body.id },
        (err, pregunta) => {
            if (err)
            res.send(err);
            // unknown user
            else if (!pregunta)
               res.send('No existen preguntas de con este id');
            // wrong password
            else
            res.send('pregunta eliminada');
 
    });

}