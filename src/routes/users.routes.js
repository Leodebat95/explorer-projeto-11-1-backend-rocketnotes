// routes (2º/5) --- arquivo por onde as requisições são endereçadas


const { Router, request, response } = require('express')

const multer = require('multer')

const uploadConfig = require('../configs/upload')

const UsersController = require('../controllers/UsersController')
  // forma de se importar a class "UsersController" pras rotas

const usersController = new UsersController()
  // const "users" (u minúsculo) é a instância da class "Users"

const UserAvatarController = require('../controllers/UserAvatarController')

const userAvatarController = new UserAvatarController()

const usersRoutes = Router()
  /* forma de se importar o "Router" direto do Express
     portanto, "app" (do "server.js") foi substituído por "usersRoutes" */

const upload = multer(uploadConfig.MULTER)

const ensureAuthenticated = require('../middlewares/ensureAuthenticated')


function myMiddleware(request, response, next) {

  console.log('Você passou pelo Middleware!')

  /* if(!request.body.isAdmin) {
    return response.json({ message: "user unauthorized"})
  } */
    // dependendo do que for posto no Insomnia ("isAdmin": true/false), o Middleware vai/ou não, deixar prosseguir o fluxo da aplicação (pois o "return" faz tudo abaixo dele parar)
  next()
}

/* usersRoutes.use(myMiddleware) --- forma de se aplicar o Middleware em todas as rotas de uma vez
   usersRoutes.post('/', myMiddleware, usersController.create) --- forma de se aplicar o Middleware na rota específica */

usersRoutes.post('/', myMiddleware, usersController.create)
  /* middleware --- são funções que tem acesso ao objeto da requisição/solicitação, ao obj. da resposta, 
                    e a próxima função de middleware no ciclo solicitação-resposta (next) 
                    next() --- é a função dentro do middleware que chama o destino/proxima função (no caso, é "usersController.create");
							                 é ela que permite prosseguir o fluxo da aplicação */

usersRoutes.put('/', ensureAuthenticated, usersController.update)
  // put --- atualizar um grupo de campos no banco de dados

usersRoutes.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update)
  // patch --- atualizar 1 campo específico no banco de dados
  // single() --- Method que manda carregar apenas 1 arq.; a String entre ('x') contém o nome que o campo deve ter


module.exports = usersRoutes
  // esse comando avisa que se está exportando esse arquivo pra quem quiser utilizar
