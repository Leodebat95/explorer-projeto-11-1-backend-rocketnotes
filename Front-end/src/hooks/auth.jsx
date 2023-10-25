// auth --- arq. contendo os Contexts de autenticação, que serão utilizados na aplicação


import { api } from "../services/api"

import { createContext, useContext, useState, useEffect } from "react"
  /* createContext --- é a context API do React
     useContext --- pra que se consiga utilizar os Contexts
     useState --- pra criar estados que armazenam infos. */

const AuthContext = createContext({})
  // o parâmetro passado dentro de "createContext" é o value default dele (nesse caso, um obj. vazio)



export function AuthProvider({ children }) {

  const [data, setData] = useState({})
  
  async function signIn({ email, password }) {

    try {
      const response = await api.post('/sessions', { email, password })
        // comando pra mandar o "email" e "password" pro Back-end (através do Method "post()" do Axios)
      
      const { user, token } = response.data
        // comando pra pegar "user" e "token" de "response.data"

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
        /* pegar o obj. "localStorage", e usar o Method "setItem" pra definir um novo conteúdo dentro do Local Storage
              setItem(x, y) => x --- key, contendo "@ nome da aplicação" e ": nome da key"
                               y --- o obj. "user" transformado em String (pra poder ser salvo no Local S.) */
      localStorage.setItem("@rocketnotes:token", token)
      
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        /* comando pra --- inserir "token" (do tipo "Bearer"), de autorização ("common['Authorization']"),
                           no "headers", por padrão ("defaults"), de todas as requests que serão feitas pelo usuário (api) */
      
      setData({ user, token })
        // pra armazenar os dados de "user" e "token" dentro de "data"

    } catch(error) {

      if(error.response) {
        alert(error.response.data.message)
          // no caso de detectar um erro previsto, usa a mensagem personalizada
          
      } else {
        alert('Não foi possível entrar.')
          // pra qualquer outro erro não conhecido, usa essa mensagem
      }
    }    /* try/catch --- nesse caso, é usado pois não se sabe se haverá algum erro, enquanto ocorrem as requisições na web
                          daí o "try" pra se a request der certo --- e o "catch" pra tratar caso haja erro
            *** o "error.response" não tem nada a ver com a "const response", só coincidiu os nomes */
  }


  function signOut() {

    localStorage.removeItem("@rocketnotes:token")
    localStorage.removeItem("@rocketnotes:user")
      // removeItem --- Method que remove os dados do "Local Storage"
    
    setData({})
      // comando pra retornar o obj. pra um obj. vazio
  }


  async function updateProfile({ user, avatarFile }) {
    /* user --- tem o obj. "user" como parâmetro, pois vai precisar receber os dados do usuário
       avatarFile --- arq. do avatar recebido */
    
    try {

      if(avatarFile) {
        // se existe um arq. "avatarFile"
  
        const fileUploadForm = new FormData()
          // comando pra poder enviar o "fileUploadForm" em formato de arq.
        
        fileUploadForm.append('avatar', avatarFile)
          // append() --- Method pra adicionar dentro do "fileUploadForm": um campo "avatar" e passando o arq. "avatarFile"
  
        const response = await api.patch("/users/avatar", fileUploadForm)
          // comando pra fazer uma request pra "/users/avatar", mandando o arq. "fileUploadForm"
  
        user.avatar = response.data.avatar
          // comando pra devolver o usuário com o conteúdo/avatar atualizado
      }
      
      await api.put("/users", user)
        // comando pra passar o usuário (user) e atualizá-lo em "/users" (através do Method "put()" do Axios)

      localStorage.setItem("@rocketnotes:user", JSON.stringify(user))
        /* atualizar info. do novo usuário no Local Storage
           pegar o obj. "localStorage", e usar o Method "setItem" pra definir/substituir um novo conteúdo dentro do Local Storage */

      setData({ user, token: data.token })
        // atualizar info. do novo usuário no state/estado (através de "setData")

      alert('Perfil atualizado!')
        // pro caso de dar tudo certo, dar esse alert

    } catch(error) {

      if(error.response) {
        alert(error.response.data.message)
          // no caso de detectar um erro previsto, usa a mensagem personalizada
          
      } else {
        alert('Não foi possível atualizar o perfil.')
          // pra qualquer outro erro não conhecido, usa essa mensagem
      }
    }   // comando pra usar o tratamento de exceção "try/catch"
  }


  useEffect(() => {
    
    const token = localStorage.getItem("@rocketnotes:token")
    const user = localStorage.getItem("@rocketnotes:user")
      // getItem --- Method que pega os dados do "Local Storage"
    
    if(token && user) {

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setData({ token, user: JSON.parse(user) })
    }
  }, [])
    /* useEffect( () => {...}, [] ) --- Hook que busca as infos. no "Local Storage", e preenche o Estado nos lugares que estão usando esse estado
                  1ª parte --- arrow f. que contém o que você quer que o Hook execute
                  2ª parte --- array que contém o state que você definir, que por sua vez, vai disparar a function do "useEffect" */



  return(
    <AuthContext.Provider value={{ signIn, signOut, updateProfile, user: data.user }}>
      {children}
    </AuthContext.Provider>
  )
}
  // children --- Components filhos (no caso, os "children" são todas as "Routes" do arq. "main")

  /* AuthContext.Provider --- "Provider" é uma Property que proporciona um value que pode ser acessado por todo o contexto;
                              ele provém o Context pras Routes
                                  no caso, é o "value={{...}}" --- ou seja, em qualquer "Routes", o "value" poderá ser acessado */



export function useAuth() {

  const context = useContext(AuthContext)
  return context
}
