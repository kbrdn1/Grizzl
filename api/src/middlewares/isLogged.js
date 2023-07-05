const jwt = require('jsonwebtoken')
require('dotenv').config()

const { JWT_SECRET } = process.env

const isLogged = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'You are not logged in' })
  }
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    req.user = decoded.data
    next()
  })
}

module.exports = isLogged
