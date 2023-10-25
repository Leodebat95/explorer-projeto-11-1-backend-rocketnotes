import { useAuth } from "../../hooks/auth"
  // o Context específico que se pretende utilizar

import { useState } from "react"
  // pra criar estados que armazenam infos. (no caso, o "email" e "password" digitados nos inputs)

import { FiLogIn, FiMail, FiLock } from "react-icons/fi"
import { Link } from "react-router-dom"

import { Container, Form, Background } from "./styles"

import { Input } from "../../components/Input"
import { Button } from "../../components/Button"



export function SignIn() {
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
    /* useState --- Hook que trabalha com estados
                    const [email, setEmail] --- 1º value: variável/nome do Estado, que armazena o value momentâneo do Estado
                                                2º value: a function que vai atualizar/acessar o Estado, quando quiser mudar o Estado
                    useState('') --- a function que permite a criação do Estado; entre (...) se informa o valor inicial do Estado
                                     ex: nesse caso, o valor incial é uma String vazia ('') */
  
  const { signIn } = useAuth()
  
  function handleSignIn() {
    signIn({ email, password })
  }
    // handleSignIn() --- function criada pra quando apertar o button "Entrar"



  return(
    <Container>
      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Faça seu login</h2>

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={ event => setEmail(event.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={ event => setPassword(event.target.value)}
        />

        <Button title="Entrar" onClick={handleSignIn} />

        <Link to="/register">
          Criar conta
        </Link>
      </Form>

      <Background />
    </Container>
  )
}

/* Link --- Component importado de "react-router-dom" que cria a navegação entre as págs.
            to="/route" --- o endereçao da rota */
