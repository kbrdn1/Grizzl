const Post = require('../db/models/Post')

// Get all posts
exports.getAllPosts = async () => {
  return Post.find().populate('comments')
}

// Get post by id
exports.getPostById = async (id) => {
  return Post.findById(id).populate('comments')
}

// Create post
exports.createPost = async (newPost) => {
  return newPost.save()
}

// Update post
exports.updatePost = async (id, post) => {
  return await Post.findByIdAndUpdate(id, { ...post }, { new: true })
}

// Delete post
exports.deletePost = async (id) => {
  return Post.findByIdAndDelete(id)
}

// Hide post
exports.hidePost = async (id, value) => {
  return Post.findByIdAndUpdate(id, { publiched: value })
}

// Like post
exports.setLikePost = async (id, userId) => {
  return Post.findByIdAndUpdate(id, { $addToSet: { likes: userId } })
}

// Unlike post
exports.unsetLikePost = async (id, userId) => {
  return Post.findByIdAndUpdate(id, { $pull: { likes: userId } })
}
