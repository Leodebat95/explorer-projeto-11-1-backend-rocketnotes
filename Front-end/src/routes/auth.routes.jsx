/*Rotas de Autenticação --- arq. que cria as rotas de autenticação;
                            só é interessante o usuário acessar elas, quando NÃO estiver logado na aplicação
                            é um arq. separado de "Rotas da Aplicação", pra evitar que o usuário acesse os dados enquanto não estiver logado */


import { Routes, Route } from "react-router-dom"

import { SignIn } from '../pages/SignIn'
import { SignUp } from '../pages/SignUp'


export function AuthRoutes() {

  return(
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  )
}
