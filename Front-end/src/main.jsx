import React from 'react'
import ReactDOM from 'react-dom/client'

import { ThemeProvider } from 'styled-components'
  // vai prover o Theme (que contém as Tokens) da estilização global

import theme from './styles/theme'
  // comando que importa o Theme, de fato

import GlobalStyles from './styles/global'
  // comando que importa o arq. CSS de estilização global (Global Styles)

import { AuthProvider } from './hooks/auth'
  // comando que importa o arq. de contexto

import { Routes } from './routes'
  // não precisa pôr a localização do arq. "Routes" pois ele é "index", e localiza automaticamente



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
  // esse comando seleciona a div #root (do index.html), e manda renderizar (pelo Method "render") o conteúdo que vem de "Routes" (tendo ainda acesso aos Contextos "AuthProvider")
