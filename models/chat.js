const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    color: String,
    enabled: Boolean,
    comentarios: [{ idUsuario: String, comentario: String }]
});

module.exports = mongoose.model('Chat', chatSchema);