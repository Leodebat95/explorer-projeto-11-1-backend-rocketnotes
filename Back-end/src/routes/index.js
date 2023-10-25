// index --- esse arquivo serve somente pra unir todas as rotas da aplicação; faz parte do contexto do arquivo "routes (2º/5)"

const { Router } = require('express')

const usersRouter = require('./users.routes')
const notesRouter = require('./notes.routes')
const tagsRouter = require('./tags.routes')
const sessionsRouter = require('./sessions.routes')

const routes = Router()
  // routes contém todas as rotas da nossa aplicação

routes.use('/users', usersRouter)
  /* use('/x', y) --- Method que indica a rota
          '/x' --- endereço da rota
          y --- (request, response); nesse caso, foi substituído direto pelo "usersRouter", que é o grupo de rotas do usuário
          ou seja, ao acessar '/users', será redirecionado para "usersRouter" */

routes.use('/notes', notesRouter)

routes.use('/tags', tagsRouter)

routes.use('/sessions', sessionsRouter)


module.exports = routes
