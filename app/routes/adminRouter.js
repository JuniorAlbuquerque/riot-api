const express = require('express')
const adminRouter = express.Router()
const adminController = require('../controllers/adminController')

adminRouter.get('/', adminController.getAdmin)
adminRouter.post('/create', adminController.createAdmin)

module.exports = adminRouter
