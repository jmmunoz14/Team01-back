var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Blog = require('../models/blog');

router.get('/', (req, res, next) => {
    Blog.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.get('/:blogId', (req, res, next) => {
    const id = req.params.blogId;
    Blog.findById(id)
        .exec()
        .then(doc => {
            console.log("From DB" + doc);
            if (doc) {
                res.status(200).json(doc);
            }
            else {
                res.status(404).json({ message: "No valid entry foundo for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
});

router.post('/',verifyToken, (req, res, next) => {

    var jwt = req.app.get('jwt');

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err ){
            res.status(403).json({'error': 'No tiene un token valido'});
        }else {
            const blog = new Blog({
                _id: new mongoose.Types.ObjectId(),
                idUsuario: req.body.idUsuario,
                idMaterias: req.body.idMaterias,
                idHabilidades: req.body.idHabilidades,
                titulo: req.body.titulo,
                descripcion: req.body.descripcion,
                date: req.body.date,
                idChat: req.body.idChat,
                idioma: req.body.idioma
            });
            blog.save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        messahe: "Handling POST request to /blogs",
                        blogCreada: result,
                        authData
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
                });
        }
    });


});

router.put('/:blogId', verifyToken,(req, res, next) => {
    var jwt = req.app.get('jwt');

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err ){
            res.status(403).json({'error': 'No tiene un token valido'});
        }else {
            Blog.findOneAndUpdate(
                { _id: req.params.blogId },
                req.body,
                { new: true },
                (err, todo) => {
                    console.log(todo)
                    if (err) return res.status(500).send(err);
                    return res.send(todo);
                }
            );
        }
    });

});

router.delete('/:blogId', verifyToken,(req, res) => {
    var jwt = req.app.get('jwt');

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err ){
            res.status(403).json({'error': 'No tiene un token valido'});
        }else {
            const id = req.params.blogId;
            Blog.deleteOne({ _id: id })
                .exec()
                .then(result => {
                    res.status(200).json({result,authData});
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err });
                });
        }
    });
});

// FORMAT OF TOKEN
// Authorization: Team01 <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
}


module.exports = router;
