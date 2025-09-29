
exports.up = knex => knex.schema.createTable("tags", table => {

  table.increments('id')
  table.text('name').notNullable()
    // notNullable() --- Method pra não permitir valores "null"

  table.integer('note_id').references('id').inTable('notes').onDelete('CASCADE')
    /* onDelete() --- Method para: se deletar a nota, 
                      automaticamente também deletar as tags (pois são herdeiras) */
  table.integer('user_id').references('id').inTable('users')
})


exports.down = knex => knex.schema.dropTable("tags")
