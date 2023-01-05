require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const usersRoute = require('./routes/users')
const loginRoute = require('./routes/login')

const app = express()
app.use(express.json())
app.use('/api/users', usersRoute)
app.use('/api/login', loginRoute)

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.listen(3000, () => console.log('Server is running on port 3000...'))
