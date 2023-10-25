import { useState } from "react"
  /* hook pra criar estados
     hook --- sempre tem esse padrão de sintaxe "use..." */

import { api } from "../../services/api"
  // forma de se importar o arq. "api"

import { FiUser, FiMail, FiLock } from "react-icons/fi"
import { Link, useNavigate } from "react-router-dom"
  // useNavigate --- Method que permite navegar entre págs. (direciona o endereço entre ("/...") )

import { Container, Form, Background } from "./styles"

import { Input } from "../../components/Input"
import { Button } from "../../components/Button"


export function SignUp() {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
    /* useState() --- dentro dos "(...)" se informa o valor inicial
       [] --- apresenta dois valores => 1º - variável/nome do estado (armazena o valor momentâneo do estado)
                                        2º - function que atualiza o estado */
  
  const navigate = useNavigate()


  function handleSignUp() {

    if(!name || !email || !password) {

      return alert("Preencha todos os campos!")
    }

    api.post('/users', { name, email, password })
      /* post() --- Method nativo de Axios, pra fazer uma Post request (no caso, na rota onde se cadastra usuários)
                    1º value --- endereço da rota em String
                    2º value --- envia o data, na forma de um Objeto */
      .then(() => {
        alert('Usuário cadastrado com sucesso!')
        navigate('/')
      })  // é executado no caso de dar tudo certo na request

      .catch( error => {
        if(error.response) {
          alert(error.response.data.message)
        } else {
          alert('Não foi possível cadastrar.')
        }
      })  // é executado no caso de dar algum erro na request
  }


  return(
    <Container>
      <Background />
      
      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Crie sua conta</h2>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={event => setName(event.target.value)}
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={event => setEmail(event.target.value)}
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={event => setPassword(event.target.value)}
        />

        <Button title="Cadastrar" onClick={handleSignUp} />

        <Link to="/">
          Voltar para o login
        </Link>
      </Form>
    </Container>
  )
}
