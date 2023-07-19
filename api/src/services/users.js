const User = require('../db/models/user')
const bcrypt = require('bcrypt')
require('dotenv').config()

// env variables
const { SALT_ROUNDS } = process.env

// Get all users
exports.getAllUsers = async () => {
  let users = await User.find()
  users = users.map((user) => {
    return {
      _id: user._id,
      username: user.username,
    }
  })
  return users
}

// Get user by username
exports.getUserByUsername = async (username) => {
  return User.findOne({ username })
}

// Get user by id
exports.getUserById = async (id) => {
  return User.findById(id)
}

// Create user
exports.createUser = async (newUser) => {
  return newUser.save()
}

// Update username
exports.setUsername = async (id, username) => {
  let user = await User.findById(id)
  if (!user) throw new Error('User not found')
  user.username = username
  return User.findByIdAndUpdate(id, user, { new: true })
}

// Update password
exports.setPassword = async (id, password) => {
  password = await hashPassword(password)
  let user = await User.findById(id)
  if (!user) throw new Error('User not found')
  user.password = password
  return User.findByIdAndUpdate(id, user, { new: true })
}

// hash password
const hashPassword = async (password) => {
  return await bcrypt.hash(password, parseInt(SALT_ROUNDS))
}
