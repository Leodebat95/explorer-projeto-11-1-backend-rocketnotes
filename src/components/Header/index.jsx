import { Container, Profile, Logout } from "./styles"

import { useNavigate } from "react-router-dom"
import { useAuth } from '../../hooks/auth'

import { api } from "../../services/api"

import { RiShutDownLine } from 'react-icons/ri'
  // forma de se importar o ícone "RiShutDownLine" da library React Icons, e da pasta "ri"

import avatarPlaceholder from "../../assets/avatar_placeholder.svg"



export function Header() {

  const { signOut, user } = useAuth()

  const navigation = useNavigate()

  function handleSignOut() {

    navigation("/")
    
    signOut()
  }

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder
    // se o usuário tem um avatar, vai ser posto o arq. da url (do back-end), se não é posto o "avatarPlaceholder"



  return(
    <Container>
      <Profile to="/profile">
        <img
          src={avatarUrl}
          alt={user.name}
        />

        <div>
          <span>Bem-vindo</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>

      <Logout onClick={handleSignOut} >
        <RiShutDownLine />
      </Logout>
    </Container>
  )
}
