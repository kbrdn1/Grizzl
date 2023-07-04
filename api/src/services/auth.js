const User = require('../db/models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userServices = require('./user')
require('dotenv').config()

// env variables
const { JWT_SECRET, SALT_ROUNDS } = process.env

// login
exports.signIn = async (username, password) => {
  const user = await userServices.getUserByUsername(username)
  if (!user) {
    throw new Error('User not found')
  }
    
  const isMatch = comparePassword(password, user.password)
  if (!isMatch) {
    throw new Error('Invalid credentials')
  }
  const token = createToken()
  return { token }
}

// register
exports.signUp = async (user) => {
  const newUser = new User(user)
  await userServices.createUser(newUser)
}

// create token
const createToken = (data) => {
  return jwt.sign({ data }, JWT_SECRET, {
    expiresIn: '1h',
  })
}

// compare password
const comparePassword = (password, hash) => {
  return bcrypt.compare(password, hash)
}

// hash password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, parseInt(SALT_ROUNDS))
}
