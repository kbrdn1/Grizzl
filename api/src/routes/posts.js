const { allPosts, postById, addPost } = require('../controllers/posts')
const isLogged = require('../middlewares/isLogged')

const router = require('express').Router()

router.get('/', isLogged, allPosts)
router.get('/:id', isLogged, postById)
router.post('/', isLogged, addPost)

module.exports = router
