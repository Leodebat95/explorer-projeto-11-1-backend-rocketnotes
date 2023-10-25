// routes (2º/5) --- arquivo por onde as requisições são endereçadas

// *** essa nota serve pra explicar como usar um Middleware

function myMiddleware(request, response, next) {

  console.log('Você passou pelo Middleware!')

  if(!request.body.isAdmin) {
    return response.json({ message: "user unauthorized"})
  }
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

