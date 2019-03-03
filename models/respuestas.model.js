const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var respuestasSchema = new mongoose.Schema({
    id:{
        type: Number,
        required: 'id can\'t be empty',
        unique: true
    },
    texto: {
        type: String,
        required: 'answer can\'t be empty'
        
    },
    
});


mongoose.model('Respuestas', respuestasSchema);