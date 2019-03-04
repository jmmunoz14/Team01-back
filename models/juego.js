const mongoose = require('mongoose');

const juegoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    name: String,
    partidas: [Number],
    habilidades: [Number],
    materias: [Number]
});
    

module.exports = mongoose.model('Juego', juegoSchema);