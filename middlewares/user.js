const UserModel = require('../models/user')
const jwt = require('jsonwebtoken')

const getUserMiddleware = async (req, res, next) => {
  const { id } = req.params
  let user

  try {
    user = await UserModel.findById(id).select('-password')
    if (user === null) {
      return res
        .status(404)
        .json({ success: false, message: `Cannot find user with id: ${id}` })
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }

  res.user = user
  next()
}

const authTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token === null) {
    return res
      .status(401)
      .json({ success: false, message: 'No access token provided' })
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({ success: false, message: error.message })
    }
    next()
  })
}

module.exports = {
  getUserMiddleware,
  authTokenMiddleware,
}
