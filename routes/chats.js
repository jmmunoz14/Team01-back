var express = require('express');
var router = express.Router();
var Joi = require('joi');
const mongoose = require('mongoose');
const Chat = require('../models/chat');

router.get('/', (req, res, next) => {
    Chat.find()
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

router.get('/:chatId', (req, res, next) => {
    const id = req.params.chatId;
    Chat.findById(id)
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

router.post('/', verifyToken, (req, res, next) => {
    var jwt = req.app.get('jwt');

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err ){
            res.status(403).json({'error': 'No tiene un token valido'});
        }else {
            const chat = new Chat({
                _id: new mongoose.Types.ObjectId(),
                color: req.body.color,
                enabled: req.body.enabled,
                comentarios:req.body.comentarios
            });
            chat.save()
                .then(result => {
                    console.log(result);
                    res.status(201).json({
                        messahe: "Handling POST request to /chats",
                        chatCreada: result
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

router.put('/:chatId', verifyToken, (req, res, next) => {
    var jwt = req.app.get('jwt');

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err ){
            res.status(403).json({'error': 'No tiene un token valido'});
        }else {
            Chat.findOneAndUpdate(
                {_id:req.params.chatId},
                req.body,
                { new: true },
                (err, todo) => {
                    if (err) return res.status(500).send(err);
                    return res.send(todo);
                }
            );
        }
    });

});

router.delete('/:chatId', verifyToken, (req, res) => {
    var jwt = req.app.get('jwt');

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err ){
            res.status(403).json({'error': 'No tiene un token valido'});
        }else {
            const id = req.params.chatId;
            Chat.deleteOne({ _id: id })
                .exec()
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({ error: err });
                });
        }
    });
});

router.delete('/',verifyToken, (req, res) => {

    var jwt = req.app.get('jwt');

    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err ){
            res.status(403).json({'error': 'No tiene un token valido'});
        }else {
            Chat.deleteMany().exec()
            .then(result => {
                res.status(200).json(result);
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
