const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var preguntasSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: 'id can\'t be empty',
        unique: true
    },
    materia: {
        type: String,
        required: 'Subject can\'t be empty',
        unique: false
    },
    enunciado: {
        type: String,
        required: 'Problem can\'t be empty',
        
    },
    respuestaID: {
        type: Number,
        required: 'Answer can\'t be empty',
        
    },
    
});


mongoose.model('Preguntas', preguntasSchema);