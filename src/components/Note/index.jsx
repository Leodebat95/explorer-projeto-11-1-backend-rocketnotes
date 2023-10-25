import { Container } from "./styles"
import { Tag } from "../Tag"



export function Note({ data, ...rest }) {

  return(
    <Container {...rest}>
      <h1>{data.title}</h1>

      {
        data.tags &&
        <footer>
          {
            data.tags.map(tag => <Tag key={tag.id} title={tag.name} />)
          }
        </footer>
      }
    </Container>
  )
}

// data.tags && --- as "tags" só serão renderizadas se elas existirem (&&)

/* map(tag) --- Method que vai percorrer cada "tag", executando o {...} da Arrow f.
                tag --- é uma variável auxiliar (pertence ao Method "map"), que corresponde a cada item que será percorrido;
                        nesse exemplo, foi dado o nome de "tag" (você que escolhe o nome)
   diferença: map() x forEach() --- "map" retorna um novo item/coleção, como resultado da sua operação
                                    já o "forEach" só conta/mostra os itens antigos, sem retornar nada novo */

/* key={} --- prop nativa do React que cria uma chave-identificadora pra cada item-Component de uma lista;
              *** é obigatório que cada "key" tenha um valor único/não repetido
              key={tag.id} --- nesse exemplo, é a forma de identificar cada "tag" na lista */
