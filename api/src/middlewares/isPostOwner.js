const { getPostById } = require('../services/posts')

const isPostOwner = async (req, res, next) => {
  const { id } = req.params
  const post = await getPostById(id)

  if (!post) {
    return res.status(404).json({ message: 'Post not found' })
  }

  const userId = req.user.user._id

  if (post.userId.toString() !== userId) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  next()
}

module.exports = isPostOwner
