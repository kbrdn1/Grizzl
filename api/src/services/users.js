const User = require('../db/models/user')
const bcrypt = require('bcrypt')

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
