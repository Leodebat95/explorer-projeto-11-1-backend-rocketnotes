// controllers (3º/5)

const knex = require("../database/knex")


class NotesController {
  
  async create(request, response) {
    
    const { title, description, tags, links } = request.body
    const user_id = request.user.id
      // const { user_id } = request.params --- antes de usar por Token, era assim, por "params"

    const [note_id] = await knex('notes').insert({
      title,
      description,
      user_id
    })
      /* com esse comando, a informação de "note_id" é inserida na tabela "notes"
         [note_id] --- tem que estar dentro de [], pois quando se insere a nova nota, 
                       é devolvido um array na 1ª posição ( [0] ) */

    const linksInsert = links.map(link => {
      return {
        note_id,
        url: link
      }
    })
      // map() --- pra percorrer cada item "link" que existe; pra cada um, vai dar o "return"
    
    await knex('links').insert(linksInsert)
      // com esse comando, a informação de "linksInsert" é inserida na tabela "links"
    
    const tagsInsert = tags.map(name => {
      return {
        note_id,
        name,
        user_id
      }
    })
      // map() --- pra percorrer cada item "tag" que existe; pra cada uma, vai dar o "return"
    
    await knex('tags').insert(tagsInsert)
      // com esse comando, a informação de "tagsInsert" é inserida na tabela "tags"

    return response.json()
  }


  async show(request, response) {

    const { id } = request.params

    const note = await knex('notes').where({ id }).first()
      // where() --- pra pegar só notas do "id" da rota; first --- pra pegar só a primeira nota
    
    const tags = await knex('tags').where({ note_id: id }).orderBy('name')
      /* where({ note_id: id }) --- significa, onde "note_id" é igual a "id"
         orderBy('name') --- pra trazer as infos. em ordem alfabética */
    
    const links = await knex('links').where({ note_id: id }).orderBy('created_at')
      // orderBy('created_at') --- pra trazer as infos. em ordem de criação/data
    
    return response.json({
      ...note,
      tags,
      links
    })
  }


  async delete(request, response) {

    const { id } = request.params

    await knex('notes').where({ id }).delete()
      // delete() --- Method que deleta o item que tem o "id"
    
    return response.json()
  }


  async index(request, response) {

    const { title, tags } = request.query
      // pra pegar as 2 variáveis que estão na URL (query params)
    const user_id = request.user.id
    
    let notes

    if(tags) {
      
      const filterTags = tags.split(',').map(tag => tag.trim())
        /* esses comandos são pra converter os textos simples das tags em array/vetor
              split(',') --- Method que converte um texto em array, usando "," 
                             como delimitador de cada campo/palavra/termo
              map() --- Method pra percorrer cada item "tag" que existe; 
                        pra cada uma, vai executar a callback f. dela
              trim() --- Method que remove os espaços em branco dentro de uma string */
      
      notes = await knex('tags')
        .select([
          "notes.id",
          "notes.title",
          "notes.user_id"
        ])
          /* select() --- Method que passa um array com quais campos 
                          se pretende selecionar de ambas tabelas (do Inner Join) */
        .where('notes.user_id', user_id)
          // esse comando é pra se filtrar pelo "id" do user
        .whereLike('notes.title', `%${title}%`)
        .whereIn('name', filterTags)
            /* whereIn('x', y) --- Method pra fazer a pesquisa baseado na "tags" (tabela do "knex")
                    'x' --- o nome do campo-item (dentro da tags)
                    y --- o value (vetor), pra ver se ele existe > no campo-item (da tags)
                          ex: ver se existe "express" > no campo-item "name" da tabela tags */
        .innerJoin("notes", "notes.id", "tags.note_id")
          /* innerJoin() --- Method pra selecionar tabelas distintas, 
                             e unificar seus dados no resultado de uma consulta;
                          ** o Inner Join faz uma interseção entre as tabelas, 
                             e pega/exibe os registros que ambas possuem;
                         *** o dado em comum entre ambas tabelas é que faz a conexão
                                 sintaxe --- (nome da tabela pai) - (Primary Key) - (Foreign Key)

                                 ex. ---          tabela Notes    <->    tabela Tags
                                           (id = 1 - Primary Key)     (note_id = 1 - Foreign Key)
                                     --- notes - notes.id - tags.note_id */
        .groupBy('notes.id')
          // comando pra que não traga/exiba notas repetidas/duplicadas
        .orderBy('notes.title')

    } else {

      notes = await knex('notes')
        .where({ user_id })
          // where({ user_id }) --- pra mostrar somente as notas feitas por este usuário
        .whereLike('title', `%${title}%`)
        .orderBy('title')
          /* whereLike('x', `%${y}%`) --- Method que busca valores que contenham uma dada palavra
                          'x' --- qual o campo onde quer fazer a consulta
                          `%${y}%` --- antes e depois (é a função dos %) da variável "y",
                                       deve ser verificado se houver qualquer parte da palavra, 
                                       e trazido os resultados
             orderBy('title') --- pra trazer as infos. em ordem alfabética */
    }

    const userTags = await knex('tags').where({ user_id })
      /* comando pra vincular as "tags" às "notes" na hora de exibir;
         where({ user_id }) --- pra mostrar somente as tags feitas por este usuário */
    
    const notesWithTags = notes.map(note => {
      // map() --- pra percorrer todas as "note" e fazer o que está {...}

      const noteTags = userTags.filter(tag => tag.note_id === note.id)
        // comando pra ver se a "tag.note_id" é igual a "note.id"; se for, fazer o "return"

      return {
        ...note,
        tags: noteTags
          // pega todos os elementos de "note", e adiciona em "tags", o "noteTags"
      }
    })

    return response.json(notesWithTags)
  }
}


module.exports = NotesController
