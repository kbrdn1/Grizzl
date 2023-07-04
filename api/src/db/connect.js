const mongoose = require('mongoose')
require('dotenv').config()

// env variables
const { MONGODB_URI, MONGODB_PASS, MONGODB_USER } = process.env

// Connect to MongoDB
const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      pass: MONGODB_PASS,
      user: MONGODB_USER,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Connected to MongoDB')
  } catch (err) {
    console.log('Error connecting to MongoDB', err)
    process.exit(1)
  }
}

module.exports = connect
