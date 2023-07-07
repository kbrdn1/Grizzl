const { getUsers, getUser } = require('../controllers/users')
const isLogged = require('../middlewares/isLogged')

const router = require('express').Router()

router.get('/', isLogged, getUsers)
router.get('/:id', isLogged, getUser)

module.exports = router
