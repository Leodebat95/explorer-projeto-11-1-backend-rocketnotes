// controllers (3º/5)

const knex = require("../database/knex")

class TagsController {

  async index(request, response) {
    
    const user_id = request.user.id
      // const { user_id } = request.params --- antes de usar por Token, era assim, por "params"

    const tags = await knex('tags')
      .where({ user_id })
        /* comando pra ir na tabela de tags e buscar as "tags"
           where({ user_id }) --- pra mostrar somente as tags feitas por este usuário */
      .groupBy("name")
        /* recurso do banco de dados; Method pra agrupar pelo aspecto que você determinar, 
           excluindo assim os itens repetidos desse aspecto;
           no caso, se pretende agrupar as tags pelos títulos delas (name) */

    return response.json(tags)
  }
}


module.exports = TagsController
