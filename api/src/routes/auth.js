const { login, register }= require('../controllers/auth');

const router = require('express').Router();

router.post('/signIn', login);
router.post('/signUp', register);

module.exports = router;