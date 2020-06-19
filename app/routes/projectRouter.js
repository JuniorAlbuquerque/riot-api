const express = require('express')
const projectRouter = express.Router()
const projectController = require('../controllers/projectController')
const isLogged = require('../middleware/login')

projectRouter.get('/:id_admin', isLogged, projectController.getProjectByAdmin)
projectRouter.get('/info/:id_project', projectController.getProjectById)
projectRouter.post('/create', isLogged, projectController.createProject)
projectRouter.get('/downloadpdf/:id_project', projectController.getPdf)

module.exports = projectRouter
