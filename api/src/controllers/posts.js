const { getAllPosts, getPostById, createPost } = require('../services/posts')
const Post = require('../db/models/Post')

// Get all posts
exports.allPosts = async (req, res) => {
  try {
    const posts = await getAllPosts()
    res.status(200).json(posts)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Get post by id
exports.postById = async (req, res) => {
  try {
    const post = await getPostById(req.params.id)
    res.status(200).json(post)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Create post
exports.addPost = async (req, res) => {
  try {
    const newPost = new Post(req.body)
    await createPost(newPost)
    res.status(200).json(newPost)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
