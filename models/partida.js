const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const partidaSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    idJugadores: [Number],
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