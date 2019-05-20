const express = require('express');
const router = express.Router();
 
const ctrlRespuesta = require('../controllers/respuestas');
 
router.post('/newanswer', verifyToken,ctrlRespuesta.register);
router.get('/obtainanswer', ctrlRespuesta.obtain);
router.get('/allanswer', ctrlRespuesta.obtainall);
router.delete('/delanswer',verifyToken, ctrlRespuesta.remove);


// FORMAT OF TOKEN
// Authorization: Team01 <access_token>

// Verify Token
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
}


module.exports = router;