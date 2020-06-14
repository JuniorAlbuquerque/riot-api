const express = require('express')
const requirementRouter = express.Router()
const requirementController = require('../controllers/requirementController')
const isLogged = require('../middleware/login')

requirementRouter.post(
  '/create',
  isLogged,
  requirementController.createRequirement,
)

module.exports = requirementRouter
