const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  hidePost,
  setLikePost,
  unsetLikePost,
} = require('../services/posts')
const Post = require('../db/models/Post')
const { validPostTitle, validPostContent } = require('../utils/regex')

// Get all posts
exports.allPosts = async (req, res) => {
  const posts = await getAllPosts()
  try {
    res.status(200).json(posts)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Get post by id
exports.postById = async (req, res) => {
  const post = await getPostById(req.params.id)
  try {
    res.status(200).json(post)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Create post
exports.addPost = async (req, res) => {
  const newPost = new Post(req.body)

  if (!validPostTitle.test(newPost.title))
    return res.status(400).json({ error: 'Invalid title' })

  if (!validPostContent.test(newPost.content))
    return res.status(400).json({ error: 'Invalid content' })

  try {
    await createPost(newPost)
    res.status(200).json(newPost)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Update post
exports.modifyPost = async (req, res) => {
  const { id } = req.params
  const post = req.body

  if (!validPostTitle.test(post.title))
    return res.status(400).json({ error: 'Invalid title' })

  if (!validPostContent.test(post.content))
    return res.status(400).json({ error: 'Invalid content' })

  try {
    await updatePost(id, post)
    res.status(200).json(await getPostById(id))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Delete post
exports.dropPost = async (req, res) => {
  const { id } = req.params
  try {
    await deletePost(id)
    res.status(200).json({ message: 'Post deleted successfully' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// Hide post
exports.visibilityPost = async (req, res) => {
  const { id } = req.params
  const { value } = req.body
  try {
    await hidePost(id, value)
    res.status(200).json({ message: 'Post updated successfully' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

//Like post
exports.likePost = async (req, res) => {
  try {
    const { id } = req.params
    const { _id } = req.user.user

    const post = await getPostById(id)
    const isLiked = post.likes.includes(_id)

    if (isLiked) {
      await unsetLikePost(id, _id)
      return res.status(200).json(await getPostById(id))
    }

    await setLikePost(id, _id)
    res.status(200).json(await getPostById(id))
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
