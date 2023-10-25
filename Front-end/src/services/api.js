// api --- arq. pra guardar as configurações do Axios


import axios from 'axios'

export const api = axios.create({

  baseURL: 'http://localhost:3333'
    /* Property que contém o endereço do Back-end;
       fica mais prático já declarar ele aqui (daí, ele já fica embutido), e depois só precisa declarar as págs. específicas (ex: "/users") */
})
  // axios.create() --- Method nativo do Axios, que serve pra criar um obj. contendo configurações
