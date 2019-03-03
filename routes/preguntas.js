const express = require('express');
const router = express.Router();
 
const ctrlPregunta = require('../controllers/preguntas');
 
router.post('/newquestion', ctrlPregunta.register);
router.get('/obtainquestion', ctrlPregunta.obtain);
router.get('/allquestion', ctrlPregunta.obtainall);
router.delete('/delquest', ctrlPregunta.remove);
module.exports = router;