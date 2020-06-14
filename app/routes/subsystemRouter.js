const express = require('express')
const subsystemRouter = express.Router()
const subsystemController = require('../controllers/subsystemController')

subsystemRouter.get('/:id_sub', subsystemController.getInfoSubById)
subsystemRouter.post('/create', subsystemController.createSub)

module.exports = subsystemRouter
