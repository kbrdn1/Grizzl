const { addComment } = require('../controllers/comments')
const isLogged = require('../middlewares/isLogged')

const router = require('express').Router()

router.post('/', isLogged, addComment)

module.exports = router
