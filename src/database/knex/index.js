const config = require('../../../knexfile')
  // esse comando traz as configurações feitas em "knexfile" pra cá

const knex = require('knex')
  // pra importar o Knex

const connection = knex(config.development)
  // pra criar a conexão do knex com o banco de dados


module.exports = connection
