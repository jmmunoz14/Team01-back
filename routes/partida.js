var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var Joi = require('joi');
const file = './persistence/partidas.json';

var partidas;
jsonfile.readFile(file).then(obj => partidas=obj).catch(error => console.error(error));

function validatePartida(partida) {
	const schema = {
		idJuego: Joi.number().required(),
		finalizado: Joi.boolean().required(),
		idJugadores: Joi.optional(),
		chat: Joi.optional()
	};
	return Joi.validate(partida, schema);
};

router.get('/', (req, res) => {
	res.send(partidas);
});

router.get('/:id', (req, res) => {
	const partida = partidas.find(j => j.id === parseInt(req.params.id));
	if (!partida) return res.status(404).send('No existe id de partida');
	res.send(partida);
});

router.post('/', (req, res) => {

	const { error } = validatePartida(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	var partida = req.body;
	partida.id = partidas.length + 1;
  partidas.push(partida);

  jsonfile.writeFile(file, partidas).then(res => {console.log('Write complete')}).catch(error => console.error(error));

	res.send(partida);
});

router.put('/:id', (req, res) => {
	var partida = partidas.find(j => j.id === parseInt(req.params.id));
	if (!partida) return res.status(404).send('No existe id de partida');

	const { error } = validatePartida(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	partida.idJugadores = req.body.idJugadores;
	partida.idJuego = req.body.idJuego;
	partida.finalizado = req.body.finalizado;
	partida.puntajes = req.body.puntajes;
  partida.chat = req.body.chat;
  
  jsonfile.writeFile(file, partidas).then(res => {console.log('Write complete')}).catch(error => console.error(error));

	res.send(partida);

});

router.delete('/:id', (req, res) => {
	const partida = partidas.find(j => j.id === parseInt(req.params.id));
	if (!partida) return res.status(404).send('No existe id de partida');

	const index = partidas.indexOf(partida);
  partidas.splice(index, 1);
  
  jsonfile.writeFile(file, partidas).then(res => {console.log('Write complete')}).catch(error => console.error(error));

	res.send(partida);
});

module.exports = router;
