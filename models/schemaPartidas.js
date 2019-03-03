const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
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

module.exports = mongoose.model('tasks', TaskSchema);