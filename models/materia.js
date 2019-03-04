const mongoose = require('mongoose');

const materiaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    name: String,
    juegos: [Number],
    habilidades: [Number]
});
    

module.exports = mongoose.model('Materia', materiaSchema);