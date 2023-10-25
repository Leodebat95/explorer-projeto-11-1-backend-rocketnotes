import { Container } from "./styles"


export function Input({ icon: Icon, ...rest }) {

  return(
    <Container>
      {Icon && <Icon size={20} />}
      <input {...rest} />
    </Container>
  )
}
  /* icon: Icon --- forma de converter uma propriedade em 1ª Maiúscula, pra ser usada no "return"
     {Icon && <Icon />} --- se existe "Icon", aí sim mostra ele; caso contrário não */
