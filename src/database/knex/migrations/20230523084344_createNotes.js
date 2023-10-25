
exports.up = knex => knex.schema.createTable("notes", table => {

  table.increments('id')
  table.text('title')
  table.text('description')

  table.integer('user_id').references('id').inTable('users')

  table.timestamp('created_at').default(knex.fn.now())
  table.timestamp('updated_at').default(knex.fn.now())
})
  /* up --- processo de criar a tabela
            aqui se está criando uma tabela, chamada "notes" 
     table.integer('user_id').references('id').inTable('users') --- comando criado por mim, que significa:
            - foi criado um campo do tipo "integer" (user_id)
            - esse "user_id" faz referência ao "id" que existe dentro da tabela "users"
     default(knex.fn.now()) --- função criada por mim pra pegar o tempo exato na "timestamp", e pôr como default */


exports.down = knex => knex.schema.dropTable("notes")
  // down --- processo de deletar a tabela
