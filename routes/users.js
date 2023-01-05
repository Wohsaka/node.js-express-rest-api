const express = require('express')
const router = express.Router()
const { body } = require('express-validator')

const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/user')
const {
  getUserMiddleware,
  authTokenMiddleware,
} = require('../middlewares/user')

router.use('/:id', [authTokenMiddleware, getUserMiddleware])

//Public routes
router.route('/').get(getUsers)
router.post(
  '/',
  body('email').isEmail(),
  body('password').isLength(5),
  createUser
)

//Private routes
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

module.exports = router
