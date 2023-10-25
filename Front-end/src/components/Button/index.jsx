/* A pasta "components" serve pra alocar os componentes que irão compor a aplicação;
          nesse caso, comp. são os botões, parágragos, seções, etc;
   Button --- pasta/arq. que contém o component "button"; cada comp. tem seu próprio arq./pasta */


import { Container } from "./styles"

export function Button({ title, loading, ...rest }) {
  /* loading = false --- pode atribuir value pra "prop" na própria desestruturação
     ...rest --- Operator que indica que qualquer outra "prop" que não foi posta na desestruturação, mas está declarada no "index.jsx" da pág:
                 será automaticamente inserida no componente (no caso, "Container") */

  return(
    <Container 
      type="button"
      disabled={loading}
      {...rest}
    >
      {loading ? 'Carregando...' : title}
    </Container>
  )
}

/* Button(props) | {props.title} --- são a forma de indicar que o conteúdo de uma propriedade (props) deve ser utilizado
   Button({ title }) | {title}   --- forma desestruturada de se indicar a prop */
