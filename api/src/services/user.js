const User = require('../db/models/user')
const bcrypt = require('bcrypt')

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
