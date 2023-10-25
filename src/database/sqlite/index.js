/* database (5º/5) --- local pra guardar os bancos de dados
   index.js --- qualquer arq. "index" serve pra, quando não se indica o arquivo que quer dentro da pasta, o VS Code busca ele por padrão */

const sqlite3 = require('sqlite3')
  // sqlite3 --- o drive de fato que vai estabelecer a comunicação com a base de dados

const sqlite = require('sqlite')
  // sqlite --- o drive que vai usar pra se conectar

const path = require('path')
  // path --- library nativa do Node; serve pra resolver compatibilidade dos endereços de arquivo, de acordo com o ambiente (windows, mac, linux, etc)


async function sqliteConnection() {

  const database = await sqlite.open({
    filename: path.resolve(__dirname, '../', 'database.db'), // tem que pôr a "," no final
    driver: sqlite3.Database
  })
    /* open() --- Method pra abrir uma conexão
       filename --- onde se pretende salvar o arq. do banco de dados 
       resolve (x, y, z) --- Method de "path" que resolve a compatibilidade dos endereços
              x --- onde o arq. que se está codando aqui, está
                    __dirname --- pega automaticamente o endereço de onde este arq. aqui, está na pasta
              y --- onde quer criar um novo arq.
              z --- nome do arq. que será criado
       driver --- escolhe quem vai ser o driver principal (geralmente, é "sqlite3" com a class ".Database") */
  
  return database
}


module.exports = sqliteConnection
