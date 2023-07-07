const mongoose = require('mongoose')

const { Schema } = mongoose

// Create Schema
const CommentSchema = new Schema({
  content: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 200,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Comment', CommentSchema)
