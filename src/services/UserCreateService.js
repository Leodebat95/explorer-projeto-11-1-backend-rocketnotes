/* arq. da Regra de Negócios
   é o arq. que contém a lógica do serviço de criação de usuário, oriundo da Inversão de Dependências */


const { hash } = require('bcryptjs')
  // hash --- função/método que vai gerar a criptografia

const AppError = require('../utils/AppError')



class UserCreateService {

  constructor(userRepository) {

    this.userRepository = userRepository
  }
  

  async execute({ name, email, password }) {
  
    const checkUserExists = await this.userRepository.findByEmail(email)
      /* está aguardando uma function "findByEmail(email)" (tem que conter o parâmetro "email") (isso é a abstração da inv. de dep.), vinda de algum repositório "userRepository", atribuído à class "this.userRepository" (o "this." indica que é um aspecto da class) */
    
    if(checkUserExists) {
      throw new AppError("Este email já está em uso.")
    }

    const hashedPassword = await hash(password, 8)
      /* "hash" é uma Promise, então precisa do "await" pra criptografia terminar de ser gerada, antes de se usar o "hash"
              hash(x, salt) --- Method que gera o dado criptografado
                        x --- o dado que será criptografado
                        salt --- fator de complexidade do "hash" */

    const userCreated = await this.userRepository.create({ name, email, password: hashedPassword })
      /* está aguardando uma function "create({...})" (tem que conter os parâmetros {...}) (isso é a abstração da inv. de dep.), vinda de algum repositório "userRepository", atribuído à class "this.userRepository" (o "this." indica que é um aspecto da class) */
    
    return userCreated
  }
}


module.exports = UserCreateService
