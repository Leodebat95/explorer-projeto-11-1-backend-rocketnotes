// --------------------- Map - Filter -----------------------------------------------------------------------------------

/* map() --- Method que percorre cada elemento que existe dentro de um Array
             feito isso, ele devolve um Novo Array

   filter() --- vai filtrar algum conteúdo do array original, e criar um Novo Array, só que com algo filtrado */


// Array Original
const tags = [
  { id: 1, name: "node", note_id: 1 },
  { id: 2, name: "express", note_id: 1 },
  { id: 3, name: "react", note_id: 1 },
  { id: 4, name: "javascript", note_id: 2 },
  { id: 5, name: "frontend", note_id: 2 }
]


// Map -----------------------------------------------------------
const newArrayOne = tags.map(tag => {
  return {
    // (ex.1) name: tag.name --- esse comando (return {...}) retorna um obj. "name" pra cada "tag" percorrida pelo map
    // (ex.2) --- ... é o "Spread Operator"
    ...tag,
    date: new Date()
  }
})
        /* map() --- cria um Novo Array a partir de "tags"
                  tag --- é a variável auxiliar que armazena cada elemento do array original
                  arrow f. --- nela se põe o que quer manipular pelo "map()"
                              o "map" vai percorrer, elem. por elem., fazendo o que a arrow f. manda (um por um) */
console.log(newArrayOne)


// Filter --------------------------------------------------------
const newArrayTwo = tags.filter(tag => tag.note_id === 1)
  // filter() --- vai retornar somente as "tag" que "note_id" é 1

console.log(newArrayTwo)
