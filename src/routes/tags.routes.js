// routes (2º/5) --- arquivo por onde as requisições são endereçadas


const { Router } = require('express')

const TagsController = require('../controllers/TagsController')

const tagsController = new TagsController()

const tagsRoutes = Router()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')


function myMiddleware(request, response, next) {

  console.log('Você passou pelo Middleware!')

  next()
}

tagsRoutes.get('/', myMiddleware, ensureAuthenticated, tagsController.index)


module.exports = tagsRoutes
