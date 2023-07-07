const { getAllUsers, getUserById } = require('../services/users')

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get user by id
exports.getUser = async (req, res) => {
  try {
    const user = await getUserById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
