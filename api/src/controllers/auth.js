const authServices = require('../services/auth')
const { getUserById, getUserByUsername } = require('../services/users')
const { validUsername, validPassword } = require('../utils/regex')

// login
exports.login = async (req, res) => {
  const { username, password } = req.body
  if (!validUsername.test(username))
    return res.status(400).json({ error: 'Invalid username' })
  if (!validPassword.test(password))
    return res.status(400).json({ error: 'Invalid password' })

  try {
    const { token, user } = await authServices.signIn(username, password)
    res.status(200).json({ jwt: token, user: user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// register
exports.register = async (req, res) => {
  const { username, password } = req.body

  if (username === '' || !validUsername.test(username))
    return res.status(400).json({ error: 'Invalid username' })
  if (password === '' || !validPassword.test(password))
    return res.status(400).json({ error: 'Invalid password' })

  try {
    await authServices.signUp({ username, password })
    res.status(200).json({ message: 'User created' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// tokenVerify
exports.tokenVerify = async (req, res) => {
  const user = req.user.user
  const id = req.body.id

  if (!user) {
    return res.status(401).json({ message: 'You are not logged in' })
  }
  const getUser = await getUserByUsername(user.username)
  const getRightUser = await getUserById(id)

  if (!getUser) {
    return res.status(401).json({ message: 'You are not logged in' })
  }

  if (getRightUser.id !== getUser.id) {
    return res.status(401).json({ message: 'You are not logged in' })
  }

  res.status(200).json({ message: 'You are logged in' })
}
