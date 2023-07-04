const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db/connect')
require('dotenv').config()
const authRoutes = require('./routes/auth')

// env variables
const { PORT } = process.env

// app
const app = express()

// db
db()

// cors
app.use(cors())

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// routes
app.use('/api/auth', authRoutes)

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
