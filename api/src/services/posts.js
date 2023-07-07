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
  return Post.findByIdAndUpdate(id, { ...post })
}

// Delete post
exports.deletePost = async (id) => {
  return Post.findByIdAndDelete(id)
}
