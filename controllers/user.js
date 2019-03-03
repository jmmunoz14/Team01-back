
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('Usuarios');
var db;
module.exports.register = (req, res, next) => {
    var user = new User();
    user.id = req.body.id;
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    user.materiasInscritas = req.body.materiasInscritas;
    user.historialPartidas = req.body.historialPartidas;
    user.save((err, doc) => {
        if (!err)
            res.send(doc);
        else {
            if(err.code == 11000)
            {
                res.status(422).send(['Este Email y/o nombre de usuario ya ha sido registrado.'])
            }
            //error handling
        }
 
    });
}

module.exports.obtain = (req, res, next) => {
    var user = new User();
    console.log("usuario " + req.body.username);
    user=User.findOne({ username: req.body.username },
        (err, user) => {
            if (err)
            res.send(err);
            // unknown user
            else if (!user)
               res.send('usuario no existe');
            // wrong password
            else
            res.send(user);
 
    });

}

module.exports.obtainall = (req, res, next) => {
    var user = new User();
    
    user=User.find({  },
        (err, user) => {
            if (err)
            res.send(err);
            // unknown user
            else if (!user)
               res.send('usuario no existe');
            // wrong password
            else
            res.send(user);
 
    });

}

module.exports.remove = (req, res, next) => {
    var user = new User();
    console.log("usuario " + req.body.username);
    user=User.deleteOne({ username: req.body.username },
    
        (err, user) => {
            if (err)
            res.send(err);
            // unknown user
            else if (!user)
               res.send('usuario no existe');
            // wrong password
            else
            res.send('el usuario fue eliminado');
            
 
    });

}