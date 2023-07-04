const authServices = require('../services/auth')

// login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body
    const { token } = await authServices.signIn(username, password)
    res.status(200).json({ jwt: token })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// register
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body
    await authServices.signUp({ username, password })
    res.status(200).json({ message: 'User created' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
