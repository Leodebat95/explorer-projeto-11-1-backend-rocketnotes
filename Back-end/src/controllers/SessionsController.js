/* controllers (3º/5) ***
      nesse caso, já é o controller da API RESTful, e não os controllers normais de funcionamento do Back-end */


const knex = require('../database/knex')

const AppError = require('../utils/AppError')

const { compare } = require('bcryptjs')
  // compare --- Method nativa do "bcrypt"

const authConfig = require('../configs/auth')

const { sign } = require('jsonwebtoken')
  // sign --- Method da library "jsonwebtoken"


class SessionsController {

  async create(request, response) {
   
    const { email, password } = request.body

    const user = await knex('users').where({ email }).first()
      /* knex() --- pra acessar a tabela (no caso, "users")
         where() --- filtra o "user" pelo "email"
         first() --- pra garantir que cada email só seja cadastrado uma vez */
    
    if(!user) {
      throw new AppError('E-mail e/ou senha incorreta', 401)
    }
      /* !user --- se o usuário não existir, dispara o "AppError"
         401 --- erro de código "unauthorized" */

    const passwordMatched = await compare(password, user.password)
      // compare() --- Method nativa do "bcrypt", que compara a senha que o usuário digitou, com a senha do database
    
    if(!passwordMatched) {
      throw new AppError('E-mail e/ou senha incorreta', 401)
    }
      // !passwordMatched --- se a senha não estiver certa (vai gerar "false"), dispara o "AppError"
    
    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })
      /* sign() --- Method da library "jsonwebtoken"
                    {} --- primeiro vem as configurações adicionais/extras, se existirem (no caso como não tem, foi só um obj. vazio)
                    secret --- depois se declara a chave secreta
                    {auth...} --- por fim vem os dados de "auth.js"
                                  subject --- conteúdo que se quer inserir dentro do token (deve estar em String) */

    return response.json({ user, token })
  }
}


module.exports = SessionsController
