const Comment = require('../db/models/Comment')

// Create comment
exports.createComment = async (newComment) => {
  return newComment.save()
}
