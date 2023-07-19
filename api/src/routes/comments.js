const {
  addComment,
  allCommentsByPostId,
  modifyComment,
  dropComment,
} = require('../controllers/comments')
const isLogged = require('../middlewares/isLogged')
const isCommentOwner = require('../middlewares/isCommentOwner')

const router = require('express').Router()

router.post('/', isLogged, addComment)
router.get('/post/:postId', isLogged, allCommentsByPostId)
router.patch('/:id', isLogged, isCommentOwner, modifyComment)
router.delete('/:id', isLogged, isCommentOwner, dropComment)

module.exports = router
