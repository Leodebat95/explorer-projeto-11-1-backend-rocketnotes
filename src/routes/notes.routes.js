// routes (2º/5) --- arquivo por onde as requisições são endereçadas


const { Router } = require('express')

const NotesController = require('../controllers/NotesController')

const notesController = new NotesController()

const notesRoutes = Router()

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')


function myMiddleware(request, response, next) {

  console.log('Você passou pelo Middleware!')

  next()
}


notesRoutes.use(ensureAuthenticated)
  //notesRoutes.use(xxx) --- forma de se passar um middleware em todas as rotas de uma vez

notesRoutes.get('/', myMiddleware, notesController.index)

notesRoutes.post('/', myMiddleware, notesController.create)

notesRoutes.get('/:id', myMiddleware, notesController.show)

notesRoutes.delete('/:id', myMiddleware, notesController.delete)


module.exports = notesRoutes
