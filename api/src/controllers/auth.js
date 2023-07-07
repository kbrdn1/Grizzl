const authServices = require('../services/auth')
const { getUserById, getUserByUsername } = require('../services/users')

// login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const { token, user } = await authServices.signIn(username, password)
    res.status(200).json({ jwt: token, user: user })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// register
exports.register = async (req, res) => {
  const { username, password } = req.body

  if (username === '')
    return res.status(400).json({ error: 'Invalid username' })
  if (password === '')
    return res.status(400).json({ error: 'Invalid password' })

  try {
    await authServices.signUp({ username, password })
    res.status(200).json({ message: 'User created' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

exports.tokenVerify = async (req, res) => {
  const user = req.user
  console.log(user)
  const id = req.body.id
  console.log(id)

  if (!user) {
    return res.status(401).json({ message: 'You are not logged in' })
  }
  const getUser = await getUserByUsername(user.username)
  console.log(getUser)
  const getRightUser = await getUserById(id)
  console.log(getRightUser)

  if (!getUser) {
    return res.status(401).json({ message: 'You are not logged in' })
  }

  if (getRightUser.id !== getUser.id) {
    return res.status(401).json({ message: 'You are not logged in' })
  }

  res.status(200).json({ message: 'You are logged in' })
}
