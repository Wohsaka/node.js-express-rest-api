const UserModel = require('../models/user')
const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find().select('-password')
    res.status(200).json({ success: true, data: users })
  } catch (error) {
    console.error(error)
    res.status(500).json({ success: false, message: error.message })
  }
}

const createUser = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() })
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10)

  const user = new UserModel({
    name: req.body.name,
    birthDay: new Date(req.body.birthDay),
    email: req.body.email,
    address: req.body.address,
    password: hashedPassword,
  })
  try {
    let newUser = await user.save()
    newUser.password = ''
    res.status(201).json({ success: true, data: newUser })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const getUser = async (req, res) => {
  try {
    res.status(200).json({ success: true, data: res.user })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

const updateUser = async (req, res) => {
  const { email } = req.body

  if (email) {
    res.user.email = email
  }
  try {
    const updatedUser = await res.user.save({ validateModifiedOnly: true })
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: updatedUser,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}

const deleteUser = async (req, res) => {
  try {
    await res.user.remove()
    res
      .status(200)
      .json({ success: true, message: 'User removed successfully' })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
}
