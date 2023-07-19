const User = require('../db/models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userServices = require('./users')
require('dotenv').config()

// env variables
const { JWT_SECRET, SALT_ROUNDS } = process.env

// login
exports.signIn = async (username, password) => {
  let user = await userServices.getUserByUsername(username)
  if (!user) {
    throw new Error('User not found')
  }

  const isMatch = await comparePassword(password, user.password)
  if (!isMatch) {
    throw new Error('Invalid credentials')
  }
  user = { _id: user._id, username: user.username }
  const token = createToken({
    user: {
      _id: user._id,
      username: user.username,
    },
  })
  return { token, user }
}

// register
exports.signUp = async (user) => {
  const existingUser = await userServices.getUserByUsername(user.username)
  if (existingUser) {
    throw new Error('User already exists')
  }
  user.password = await hashPassword(user.password)
  const newUser = new User(user)
  await userServices.createUser(newUser)
}

// create token
const createToken = (data) => {
  return jwt.sign({ data }, JWT_SECRET, {
    expiresIn: '1d',
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
