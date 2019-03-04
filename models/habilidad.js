const mongoose = require('mongoose');

const habilidadSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    name: String,
    juegos: [Number],
    materias: [Number]
});
    

module.exports = mongoose.model('Habilidad', habilidadSchema);