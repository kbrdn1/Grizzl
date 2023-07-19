const {
  getAllUsers,
  getUserById,
  setUsername,
  setPassword,
} = require('../services/users')
const { validUsername, validPassword } = require('../utils/regex')

// Get all users
exports.getUsers = async (req, res) => {
  const users = await getAllUsers()
  try {
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Get user by id
exports.getUser = async (req, res) => {
  const user = await getUserById(req.params.id)
  try {
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update username
exports.updateUsername = async (req, res) => {
  const { username } = req.body

  if (req.user.user._id !== req.params.id)
    return res.status(401).json({ error: 'You are not allowed to do that' })

  if (!validUsername.test(username))
    return res.status(400).json({ error: 'Invalid username' })

  try {
    await setUsername(req.params.id, username)
    res.status(200).json(await getUserById(req.params.id))
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// Update password
exports.updatePassword = async (req, res) => {
  const { password } = req.body

  if (req.user.user._id !== req.params.id)
    return res.status(401).json({ error: 'You are not allowed to do that' })

  if (!validPassword.test(password))
    return res.status(400).json({ error: 'Invalid password' })

  try {
    await setPassword(req.params.id, password)
    res.status(200).json(await getUserById(req.params.id))
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
