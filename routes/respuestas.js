const express = require('express');
const router = express.Router();
 
const ctrlRespuesta = require('../controllers/respuestas');
 
router.post('/newanswer', ctrlRespuesta.register);
router.get('/obtainanswer', ctrlRespuesta.obtain);

 
module.exports = router;