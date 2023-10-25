/* Rotas da Aplicação --- arq. que cria as rotas da aplicação;
                          só é interessante o usuário acessar elas, enquanto estiver logado na aplicação;
                          é um arq. separado de "Rotas de Autenticação", pra evitar que o usuário acesse elas enquanto não estiver logado */


import { Routes, Route } from "react-router-dom"

import { Home } from '../pages/Home'
import { Profile } from '../pages/Profile'
import { Details } from '../pages/Details'
import { New } from '../pages/New'


export function AppRoutes() {

  return(
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new" element={<New />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/details/:id" element={<Details />} />
    </Routes>
  )
}

/* Routes --- Component importado de "react-router-dom" que vai envolver todas as rotas da aplicação
   Route --- Component importado de "react-router-dom" que vai envolver cada rota específica
             path="" --- endereço da rota
             element={} --- elemento que se deseja renderizar/exibir */
