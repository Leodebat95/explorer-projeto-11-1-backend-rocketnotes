/* controllers (3º/5) --- parte responsável pro processar as requisições da aplicação;
                          é quem vai de fato executar o que o usuário requisitar;
                          baseado na rota, o controller recebe uma tarefa */

// *** essa nota explica os detalhes de "UsersController"

const AppError = require('../src/utils/AppError')

class UsersController {

  create(request, response) {

    const { name, email, password } = request.body
      // request.body --- é o corpo da requisição (nesse caso, na forma desestruturada)
    
    if(!name) {
      throw new AppError('Nome é obrigatório!')
    }

    response.status(201).json({ name, email, password })
      /* response.send(`Usuário: ${name}, E-mail: ${email}, Senha: ${password}`)
            - além de responder com "send", pode-se responder direto no formato pretendido (como no caso "json")
            - json --- é o padrão mais tradicional de utilização em APIs 
         status(xxx) --- Method que indica qual HTTP status terá a requisição; o "(xxx)" é o código desejado 
            * não é uma info. obrigatória, é opcional */
  }
}

/* Controller pode ter no máx 5 Methods (se precisar de 6+, criar um controller à parte), ou no mín 1 também:
        index  --- um método GET pra listar vários registros; ex: listar todos usuários cadastrados
        show   --- GET pra exibir um registro específico; ex: mostrar os dados de um usuário específico
        create --- POST pra criar um registro
        update --- PUT pra atualizar um registro
        delete --- DELETE pra poder remover um registro */


// module.exports = UsersController
