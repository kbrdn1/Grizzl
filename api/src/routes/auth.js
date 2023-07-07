const { login, register, tokenVerify } = require('../controllers/auth')
const isLogged = require('../middlewares/isLogged')

const router = require('express').Router()

router.post('/signIn', login)
router.post('/signUp', register)
router.post('/verify', isLogged, tokenVerify)

module.exports = router
