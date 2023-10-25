// server (1º/5) --- é o arquivo/ponto de entrada da aplicação



require('dotenv/config')
  // pra que se tenha acesso as variáveis de ambiente

require('express-async-errors')
  // importar dados do "express-async-errors"

const migrationsRun = require('./database/sqlite/migrations')

const AppError = require('./utils/AppError')

const uploadConfig = require('./configs/upload')

const express = require('express')
  // require() --- Method que pega todos os dados da pasta "express" (dentro de "node_modules")

const routes = require('./routes')
  // *** quando não se indica o arquivo que quer dentro da pasta, o VS Code busca por padrão o "index"

const cors = require('cors')


migrationsRun()


const app = express()
  // forma de se inicializar o "express"

app.use(cors())
  // forma de inicializar o "cors"

app.use(express.json())
  // forma de indicar pro node/aplicação em qual formato a requisição está

app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))
  // express.static() --- Method do Express pra servir arqs. estáticos

app.use(routes)


app.use((error, request, response, next) => {
  
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }     /* forma de saber se o erro foi gerado pelo client-side
           x instanceof y --- keyword que gera "true" se um obj. for uma instância de uma class */
  
  console.error(error) // comando pra, se precisar, conseguir debugar o erro

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })    // se for um erro do server-side, emite um erro padrão
})


const PORT = process.env.SERVER_PORT || 3333
  /* var. que contém o endereço da porta que a API vai atender as requisições
        * se quiser ver no navegador, só pôr --- localhost:(número da porta) - ex. localhost:3333 */


app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
  /* listen(x, function()) --- Method que dá um comando pra aplicação executar algo ao chegar em dada porta
        x --- endereço/variável da porta
        function() --- o que vai ocorrer ao se executar */
