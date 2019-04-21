const mongoose = require('mongoose');

const materiaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    nameEn: String,
    nameEs:String,
    shortName: String,
    img: String,
    descEn: String,
    descEs: String,
    juegos: [Number],
    habilidades: [Number]
});
    

module.exports = mongoose.model('Materia', materiaSchema);