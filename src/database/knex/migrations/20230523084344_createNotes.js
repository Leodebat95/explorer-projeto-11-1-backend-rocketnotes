
exports.up = knex => knex.schema.createTable("notes", table => {
  /* up --- processo de criar a tabela;
            aqui se está criando uma tabela, chamada "notes" */
  // CADA METHOD aqui: gera uma coluna com o tipo de dado correspondente > na tabela de SQL
  // STRINGS dentro dos methods: são o NOME da coluna no banco de dados (ex: text('descricao') )

  table.increments('id')
  table.text('title')
  table.text('description')
    /* increments() --- Method que gera uma coluna de auto-incremento (chave primária)
       text() --- M.que gera coluna de texto longo (sem limite fixo) */

  table.integer('user_id').references('id').inTable('users')
    /* integer() --- M.que gera coluna de número inteiro
       references() --- M.que define chave estrangeira;
                        no caso em questão, significa:
            - foi criada uma coluna do tipo "integer" (user_id)
            - esse "user_id" > faz referência ao "id" - que existe dentro da tabela "users" */

  table.timestamp('created_at').default(knex.fn.now())
  table.timestamp('updated_at').default(knex.fn.now())
})
  /* timestamp() --- M.que gera coluna de data e hora
     default(knex.fn.now()) --- Method pra pegar o tempo exato na "timestamp", 
                                e pôr como default */


exports.down = knex => knex.schema.dropTable("notes")
  // down --- processo de deletar a tabela
