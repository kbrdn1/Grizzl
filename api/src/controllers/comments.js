const { createComment } = require('../services/comments')
const Comment = require('../db/models/Comment')

// Create comment
exports.addComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body)
    await createComment(newComment)
    res.status(200).json(newComment)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
