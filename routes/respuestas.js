const express = require('express');
const router = express.Router();
 
const ctrlRespuesta = require('../controllers/respuestas');
 
router.post('/newanswer', ctrlRespuesta.register);
router.get('/obtainanswer', ctrlRespuesta.obtain);
router.get('/allanswer', ctrlRespuesta.obtainall);
router.delete('/delanswer', ctrlRespuesta.remove);
module.exports = router;