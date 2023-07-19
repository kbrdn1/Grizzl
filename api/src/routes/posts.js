const {
  allPosts,
  postById,
  addPost,
  modifyPost,
  dropPost,
  visibilityPost,
  likePost,
} = require('../controllers/posts')
const isLogged = require('../middlewares/isLogged')
const isPostOwner = require('../middlewares/isPostOwner')

const router = require('express').Router()

router.get('/', isLogged, allPosts)
router.get('/:id', isLogged, postById)
router.post('/', isLogged, addPost)
router.patch('/:id', isLogged, isPostOwner, modifyPost)
router.delete('/:id', isLogged, isPostOwner, dropPost)
router.patch('/hide/:id', isLogged, isPostOwner, visibilityPost)
router.get('/like/:id', isLogged, likePost)

module.exports = router
