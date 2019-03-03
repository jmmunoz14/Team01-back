var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var Joi = require('joi');
const mongoose = require('mongoose');
const Partida = require('../models/partida');
const file = './persistence/partidas.json';

var partidas;
jsonfile.readFile(file).then(obj => partidas = obj).catch(error => console.error(error));

function validatePartida(partida) {
	const schema = {
		idJuego: Joi.number().required(),
		finalizado: Joi.boolean().required(),
		idJugadores: Joi.optional(),
		puntajes: Joi.optional(),
		chat: Joi.optional()
	};
	return Joi.validate(partida, schema);
};

router.get('/', (req, res) => {
	//res.send(partidas);
	Product.find()
		.exec()
		.then(docs => {
			console.log(docs);
			res.status(200).json(doc);
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({ error: err });
		});
});

router.get('/:id', (req, res) => {
	/*const partida = partidas.find(j => j.id === parseInt(req.params.id));
	if (!partida) return res.status(404).send('No existe id de partida');
	res.send(partida);*/
	const id = req.params.id;
	Product.findById(id)
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

router.post('/', (req, res) => {

	const { error } = validatePartida(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	/*var partida = req.body;
	partida.id = partidas.length + 1;
	partidas.push(partida);
	jsonfile.writeFile(file, partidas).then(res => { console.log('Write complete') }).catch(error => console.error(error));
	res.send(partida);*/


	//console.log(new Task(req.body));

	const partida = new Partida({
		id: new mongoose.Types.ObjectId(),
		idJugadores: req.body.idJugadores,
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

router.patch('/:id', (req, res) => {
	/*var partida = partidas.find(j => j.id === parseInt(req.params.id));
	if (!partida) return res.status(404).send('No existe id de partida');

	const { error } = validatePartida(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	partida.idJugadores = req.body.idJugadores;
	partida.idJuego = req.body.idJuego;
	partida.finalizado = req.body.finalizado;
	partida.puntajes = req.body.puntajes;
	partida.chat = req.body.chat;

	jsonfile.writeFile(file, partidas).then(res => { console.log('Write complete') }).catch(error => console.error(error));

	res.send(partida);*/

	const { error } = validatePartida(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	const idp = req.params.id;
	//Partida.update({ id: idp },{$set:{}});
});

router.delete('/:id', (req, res) => {
	/*const partida = partidas.find(j => j.id === parseInt(req.params.id));
	if (!partida) return res.status(404).send('No existe id de partida');

	const index = partidas.indexOf(partida);
	partidas.splice(index, 1);

	jsonfile.writeFile(file, partidas).then(res => { console.log('Write complete') }).catch(error => console.error(error));

	res.send(partida);*/
	const idp = req.params.id;
	Partida.remove({ id: idp })
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
