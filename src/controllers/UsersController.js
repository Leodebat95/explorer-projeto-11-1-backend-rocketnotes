/* controllers (3º/5) --- parte responsável por processar as requisições da aplicação;
                          é quem vai de fato executar o que o usuário requisitar;
                          baseado na rota, o controller recebe uma tarefa */


const { hash, compare } = require('bcryptjs')
  /* hash --- função/método que vai gerar a criptografia
     compare --- função/método que compara se dados são iguais, em dados criptografados */

const AppError = require('../utils/AppError')

const sqliteConnection = require('../database/sqlite')

const UserRepository = require('../repositories/UserRepository')
  // importar as infos. do banco de dados de "UserRepository"

const UserCreateService = require('../services/UserCreateService')



class UsersController {

  async create(request, response) {

    const { name, email, password } = request.body

    const userRepository = new UserRepository()
      // forma de se instanciar o "UserRepository"
    
    const userCreateService = new UserCreateService(userRepository)
      // forma de se instanciar o "UserCreateService", pondo o "userRepository" como parâmetro

    await userCreateService.execute({ name, email, password })
      // executa a lógica do method "execute" do "UserCreateService"
    
    return response.status(201).json()
  }


  async update(request, response) {
    
    const { name, email, password, old_password } = request.body
    const user_id = request.user.id
      /* const { id } = request.params --- antes, era pelo "params" que se acessava o "user id"
         agora, é direto pelo token */

    const database = await sqliteConnection()

    const user = await database.get("SELECT * FROM users WHERE id = (?)", [user_id])
      // forma de selecionar o usuário pelo "id"
    
    if(!user) {
      throw new AppError('Usuário não encontrado.')
    }

    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if((userWithUpdatedEmail) && (userWithUpdatedEmail.id !== user.id)) {
      throw new AppError('Este email já está em uso.')
    }

    user.name = name ?? user.name
    user.email = email ?? user.email
          /* esse comando é pra permitir que se atualize somente coisas específicas, sem que se perca os dados que já existiam

             x ?? user.x --- serve pra indicar que, se existir conteúdo dentro de "x", o próprio conteúdo será utilizado
                             se não existir conteúdo dentro de "x", deve usar o "user.x"
             ?? --- nullish operator; cria uma condição de que "ou é o 1º, ou é o 2º */

    if(password && !old_password) {
      throw new AppError('Você precisa informar a senha antiga para definir a nova senha.')
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password)

      if(!checkOldPassword) {
        throw new AppError('A senha antiga não confere.')
      }

      user.password = await hash(password, 8)
    }
      /* compare(x, y) --- Method que compara se os dados "x" e "y" são iguais, em dados criptografados;
                           faz com que os dados criptografados possam ser lidos enquanto se está codando */

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    )

    return response.status(200).json()
  }
}


module.exports = UsersController
