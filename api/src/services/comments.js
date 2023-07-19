const Comment = require('../db/models/Comment')
const Post = require('../db/models/Post')

// Create comment
exports.createComment = async (newComment) => {
  Post.findByIdAndUpdate(newComment.postId, {
    $push: { comments: newComment._id },
  }).exec()
  return newComment.save()
}

// Get all comments by post id
exports.getAllCommentsByPostId = async (postId) => {
  return Comment.find({ postId: postId })
}

// Get comment by id
exports.getCommentById = async (id) => {
  return Comment.findById(id)
}

// Update comment
exports.updateComment = async (id, comment) => {
  return Comment.findByIdAndUpdate(id, { ...comment })
}

// Delete comment
exports.deleteComment = async (id) => {
  //remove commentId from post
  const post = await Post.findOne({ comments: id })
  post.comments = post.comments.filter((comment) => comment != id)
  post.save()
  return Comment.findByIdAndDelete(id)
}
