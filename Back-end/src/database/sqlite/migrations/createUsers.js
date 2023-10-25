/* migrations --- forma de se importar dados em SQL pro JS
                  assim, se automatiza o processo de criação/recriação de tabelas SQL pelo JS */

const createUsers = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
`
// "IF NOT EXISTS" adicionado na string, é pra não deixar ocorrer choque de dado repetido, se a tabela já existir no SQL ao ser recriada no JS

module.exports = createUsers
