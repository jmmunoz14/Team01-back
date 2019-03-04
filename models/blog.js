const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idUsuario: Number,
    idMaterias: [Number],
    idHabilidades: [Number],
    titulo:String,
    descripcion: String,
    chat: { 
        id: Number, 
        color: String, 
        enabled: Boolean 
    }
});

module.exports = mongoose.model('Blog', blogSchema);