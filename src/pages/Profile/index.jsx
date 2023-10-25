import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/auth"

import avatarPlaceholder from "../../assets/avatar_placeholder.svg"
import { api } from "../../services/api"

import { Container, Form, Avatar } from "./styles"
import { Input } from "../../components/Input"
import { Button } from "../../components/Button"



export function Profile() {

  const { user, updateProfile } = useAuth()
  
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [passwordOld, setPasswordOld] = useState()
  const [passwordNew, setPasswordNew] = useState()

  const navigate = useNavigate()

  const [avatarFile, setAvatarFile] = useState(null)
    /* state que guarda o arq./a nova imagem selecionada/uploadada pelo usuário;
       null --- state inicial é sem avatar */
  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder
    // se o usuário tem um avatar, vai ser posto o arq. da url (do back-end), se não é posto o "avatarPlaceholder" 
  
  const [avatar, setAvatar] = useState(avatarUrl)
    /* state que exibe o arq. selecionado (o avatar, de fato)
       se o user já tiver um avatar, esse avatar vai ser posto aqui */

  async function handleUpdate() {
    // function criada pra prop "OnClick", do "Button"

    const updated = {
      name,
      email,
      password: passwordNew,
      old_password: passwordOld
    }

    const userUpdated = Object.assign(user, updated)
      /* Object.assign(target, source) --- Method pra copiar os valores de um obj. de origem, pra um obj. de destino;
                                           só é retornado o obj. destino
                        source --- obj. de origem
                        target --- obj. de destino; ele é que é retornado pelo Method
                                   quando existirem propriedades iguais, mas com valores diferentes, entre "target" e "source":
                                          o valor final sobrescrito/considerado será o de "source" */
    
    await updateProfile({ user: userUpdated, avatarFile })
      // a parte do "avatarFile" faz o upload do arq. do avatar pro back-end
  }

  function handleChangeAvatar(event) {
    // function criada pra prop "onChange", do "Avatar Input"

    const file = event.target.files[0]
      // comando pra extrair o arq. do "event" da prop "onChange" (na primeira posição [0])
    setAvatarFile(file)
      // colocar aqui dentro (avatarFile/setAvatarFile) o arq. que o usuário acabou de selecionar

    const imagePreview = URL.createObjectURL(file)
      // toda vez que o usuário mudar de avatar, é gerada uma "url" pra atualizar o state que exibe o avatar (avatar/setAvatar)
    setAvatar(imagePreview)
  }

  function handleBack() {

    navigate(-1)
  }



  return(
    <Container>
      <header>
        <button type="button" onClick={handleBack}>
          <FiArrowLeft />
        </button>
      </header>

      <Form>
        <Avatar>
          <img
            src={avatar}
            alt="Foto do usuário"
          />

          <label htmlFor="avatar">
            <FiCamera />

            <input
              id="avatar"
              type="file"
              onChange={handleChangeAvatar}
            />
          </label>
        </Avatar>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          value={name}
          onChange={ e => setName(e.target.value)}
            // comando (function) pra atualizar o State (as infos. do usuários)
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          value={email}
          onChange={ e => setEmail(e.target.value)}
        />

        <Input
          placeholder="Senha atual"
          type="password"
          icon={FiLock}
          onChange={ e => setPasswordOld(e.target.value)}
        />

        <Input
          placeholder="Nova senha"
          type="password"
          icon={FiLock}
          onChange={ e => setPasswordNew(e.target.value)}
        />

        <Button title="Salvar" onClick={handleUpdate} />
      </Form>
    </Container>
  )
}
  // htmlFor + id --- props que vinculam o "Label" ao "input"
