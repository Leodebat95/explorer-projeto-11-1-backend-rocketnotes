import { BrowserRouter } from "react-router-dom"
  // BrowserRouter --- Component importado de "react-router-dom" que vai decidir se se está nas rotas de "aplicação" ou "autenticação"

import { useAuth } from "../hooks/auth"

import { AppRoutes } from "./app.routes"
import { AuthRoutes } from "./auth.routes"


export function Routes() {

  const { user } = useAuth()
  
  return(
    <BrowserRouter>
      { user ? <AppRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  )
}
  // { user ? <AppRoutes /> : <AuthRoutes />} --- se tem um usuário, vai pra "AppRoutes"; se não, continua em "AuthRoutes"
