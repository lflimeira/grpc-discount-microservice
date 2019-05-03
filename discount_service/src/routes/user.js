const express = require('express')
const validateSchema = require('../controllers/middlewares/validation')
const userController = require('../controllers/user')

const router = express.Router()

router.post(
  '/',
  validateSchema.user,
  userController.createUser
)

module.exports = router
