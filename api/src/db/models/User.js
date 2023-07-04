const mongoose = require('mongoose')

const { Schema } = mongoose

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
    minLength: 3,
    maxLength: 20,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
})

module.exports = mongoose.model('User', UserSchema)
