// ensureAuthenticated --- arq. que serve pra garantir a autenticação


const { verify } = require('jsonwebtoken')
  // method nativo do "jsonwebtoken"

const AppError = require('../utils/AppError')

const authConfig = require('../configs/auth')


function ensureAuthenticated(request, response, next) {

  const authHeader = request.headers.authorization
    // o token do usuário vai estar dentro da "request", no cabeçalho (headers), e na autorização (authorization)

  if(!authHeader) {
    throw new AppError('JWT Token não informado', 401)
  }
    // comando pro caso do token não existir
  
  const [, token] = authHeader.split(" ")
    /* split() --- Method que separa a String em Vetores (Arrays);
                   se indica entre "xxx" (mesmo que seja só um espaço) qual é o caractere que deve realizar a divisão em Vetores
       [, token] --- desse novo Array criado, só importa o slot 2 (que é o valor do token);
                     portanto, se cria uma variável nomeada "token" pra receber esse valor */

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret)
      /* try --- pra verificar se o token é válido
            
            sub --- o conteúdo armazenado, no Method "verify"
            sub: user_id --- forma de renomear "sub" pra "user_id" (quando se usa "x: y", é uma forma de rebatizar uma variável)
            
            verify(token, authConfig.jwt.secret) --- Method que verifica se "token" é um JWT token válido */

    request.user = {
      id: Number(user_id),
    }
      // user --- Property criada na "request", pra receber o token (na forma da Property criada "id")

    return next()
      // next() --- Method que dá o comando pra prosseguir pra próxima function após ter passado pelo Middleware

  } catch {
    throw new AppError('JWT Token inválido', 401)
      // comando pro caso do token ser inválido
  }
}


module.exports = ensureAuthenticated
