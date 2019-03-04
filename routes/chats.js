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

router.post('/', (req, res, next) => {
    const chat = new Chat({
        _id: new mongoose.Types.ObjectId(),
        color: req.body.color,
        enabled: req.body.enabled
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
});

router.put('/:chatId', (req, res, next) => {

    Chat.findOneAndUpdate(
        req.params.chatId,
        req.body,
        { new: true },
        (err, todo) => {
            if (err) return res.status(500).send(err);
            return res.send(todo);
        }
    );

});

router.delete('/:chatId', (req, res) => {
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
});

module.exports = router;
