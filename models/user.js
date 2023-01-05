const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthDay: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
  registerDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  password: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('UserModel', userSchema)
