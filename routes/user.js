const express = require('express');
const router = express.Router();
 
const ctrlUser = require('../controllers/user');
 
router.post('/register', ctrlUser.register);
router.get('/obtain', ctrlUser.obtain);
router.get('/obtainall', ctrlUser.obtainall);
router.delete('/remove', ctrlUser.remove);
 
module.exports = router;