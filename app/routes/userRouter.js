const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/userController')

userRouter.post('/login', userController.login)
userRouter.get('/profile/:id_user', userController.getProfile)
userRouter.post('/update', userController.updateUser)


module.exports = userRouter
