var express = require('express');
var router = express.Router();
var Joi = require('joi');
const mongoose = require('mongoose');
const Partida = require('../models/partida');

function validatePartida(partida) {
	const schema = {
		idJuego: Joi.number().required(),
		finalizado: Joi.boolean().required(),
		idUsuarios: Joi.optional(),
		puntajes: Joi.optional(),
		chat: Joi.optional()
	};
	return Joi.validate(partida, schema);
};

router.get('/', (req, res, next) => {
	Partida.find()
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

router.get('/:partidaId', (req, res, next) => {
	const id = req.params.partidaId;
	Partida.findById(id)
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
	const partida = new Partida({
		_id: new mongoose.Types.ObjectId(),
		idUsuarios: req.body.idUsuarios,
		idJuego: req.body.idJuego,
		finalizado: req.body.finalizado,
		puntajes: req.body.puntajes,
		chat: req.body.chat
	});
	partida.save()
		.then(result => {
			console.log(result);
			res.status(201).json({
				messahe: "Handling POST request to /partidas",
				partidaCreada: result
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				error: err
			})
		});
});

router.put('/:partidaId', (req, res, next) => {

	Partida.findOneAndUpdate(
		req.params.partidaId,
		req.body,
		{ new: true },
		(err, todo) => {
			if (err) return res.status(500).send(err);
			return res.send(todo);
		}
	);

});

router.delete('/:partidaId', (req, res) => {
	const id = req.params.partidaId;
	Partida.deleteOne({ _id: id })
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
