const bcrypt = require('bcrypt')
const UserModel = require('../models/user')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide credentials' })
  }

  try {
    const user = await UserModel.findOne({ email: email })
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      return res
        .status(200)
        .json({ success: true, message: 'Incorrect password or email' })
    }

    const accessToken = jwt.sign(
      { ...user._doc, password: null },
      process.env.ACCESS_TOKEN_SECRET
    )
    res.status(200).json({
      success: true,
      message: 'Match, user loged in!',
      data: { accessToken },
    })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
  login,
}
