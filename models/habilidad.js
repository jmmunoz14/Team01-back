const mongoose = require('mongoose');

const habilidadSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    nameEn: String,
    nameEs:String,
    shortName: String,
    img: String,
    descEn: String,
    descEs: String,
    juegos: [Number],
    materias: [Number]
});
    

module.exports = mongoose.model('Habilidad', habilidadSchema);