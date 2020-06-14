const express = require('express')
const memberRouter = express.Router()
const memberController = require('../controllers/memberController')
const isLogged = require('../middleware/login')

memberRouter.post('/create', isLogged, memberController.createMember)

module.exports = memberRouter
