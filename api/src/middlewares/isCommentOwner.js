const { getCommentById } = require('../services/comments')

const isCommentOwner = async (req, res, next) => {
  const { id } = req.params
  const comment = await getCommentById(id)

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' })
  }

  const userId = req.user.user._id

  if (comment.userId.toString() !== userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  next()
}

module.exports = isCommentOwner
