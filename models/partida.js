const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partidaSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idUsuarios: [Number],
    idJuego: Number,
    finalizado: Boolean,
    puntajes: [Number],
    chat: { 
        id: Number, 
        color: String, 
        enabled: Boolean 
    }
});

module.exports = mongoose.model('Partida', partidaSchema);