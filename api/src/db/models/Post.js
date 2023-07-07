const mongoose = require('mongoose')

const { Schema } = mongoose

// Create Schema
const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  content: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 500,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  publiched: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Like',
    },
  ],
})

module.exports = mongoose.model('Post', PostSchema)
