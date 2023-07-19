const {
  createComment,
  getAllCommentsByPostId,
  updateComment,
  deleteComment,
  getCommentById,
} = require('../services/comments')
const Comment = require('../db/models/Comment')
const { validComment } = require('../utils/regex')

// Create comment
exports.addComment = async (req, res) => {
  const newComment = new Comment(req.body)

  if (!validComment.test(newComment.content))
    return res.status(400).json({ error: 'Invalid comment' })

  try {
    await createComment(newComment)
    res.status(200).json(newComment)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Get all comments by post id
exports.allCommentsByPostId = async (req, res) => {
  try {
    const { postId } = req.params
    const comments = await getAllCommentsByPostId(postId)
    res.status(200).json(comments)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Update comment
exports.modifyComment = async (req, res) => {
  const { id } = req.params
  const comment = req.body

  if (!validComment.test(comment.content))
    return res.status(400).json({ error: 'Invalid comment' })

  try {
    await updateComment(id, comment)
    res.status(200).json(await getCommentById(id))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Delete comment
exports.dropComment = async (req, res) => {
  const { id } = req.params
  try {
    await deleteComment(id)
    res.status(200).json({ message: 'Comment deleted successfully' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
