import { Container } from "./styles"


export function ButtonText({ title, isActive = false, ...rest }) {
  
  return(
    <Container
      type="button"
      $isactive={isActive.toString()}
      {...rest}
    >
      {title}
    </Container>
  )
}
  /* $isactive --- prop que permite só provocar alguma alteração, se o item estiver no estado "active"
                   toString() --- é recomendado que o value (isActive) dessa prop seja passado como String;
                                  por isso esse Method é usado */
