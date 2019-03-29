const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idUsuario: String,
    idMaterias: [Number],
    idHabilidades: [Number],
    titulo:String,
    descripcion: String,
    date:String,
    idChat: String
});

module.exports = mongoose.model('Blog', blogSchema);