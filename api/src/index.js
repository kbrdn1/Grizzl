const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db/connect')
require('dotenv').config()
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')
const postsRoutes = require('./routes/posts')
const commentsRoutes = require('./routes/comments')
const mongoSanitizeMiddleware = require('express-mongo-sanitize')

// env variables
const { PORT, APP_URL } = process.env

// app
const app = express()

app.use(mongoSanitizeMiddleware())
// db
db()

// cors
app.use(
  cors({
    origin: APP_URL,
  })
)

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/comments', commentsRoutes)

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
