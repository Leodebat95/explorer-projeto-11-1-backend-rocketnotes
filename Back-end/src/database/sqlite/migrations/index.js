const sqliteConnection = require('../../sqlite')
const createUsers = require('./createUsers')


async function migrationsRun() {

  const schemas = [
    createUsers
  ].join('')
      /* esse obj. schemas é pra se referir as Tabelas que o banco vai ter
        join() --- se junta todas as migrations (ex. "createUsers") e, como parâmetro pra juntá-las, não usar nada (string aberta ''), ou seja, remove os espaços que podem estar lá */
  
  sqliteConnection()
    .then(db => db.exec(schemas))
    .catch(error => console.error(error))
      /* Promieses do "sqliteConnection" 
         exec() --- Method que executa o que está entre (...)
         se der erro, o "catch" vai mostrar ele */
}


module.exports = migrationsRun
