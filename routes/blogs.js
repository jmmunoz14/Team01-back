var express = require('express');
var router = express.Router();
var Joi = require('joi');
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

router.post('/', (req, res, next) => {
    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        idUsuario: req.body.idUsuario,
        idMaterias: req.body.idMaterias,
        idHabilidades: req.body.idHabilidades,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        chat: req.body.chat
    });
    blog.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                messahe: "Handling POST request to /blogs",
                blogCreada: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
});

router.put('/:blogId', (req, res, next) => {

    Blog.findOneAndUpdate(
        req.params.blogId,
        req.body,
        { new: true },
        (err, todo) => {
            if (err) return res.status(500).send(err);
            return res.send(todo);
        }
    );

});

router.delete('/:blogId', (req, res) => {
    const id = req.params.blogId;
    Blog.deleteOne({ _id: id })
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
