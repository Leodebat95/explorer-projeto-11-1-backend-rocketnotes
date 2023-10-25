// auth --- arq. que guarda as configurações de autenticação da aplicação

module.exports = {

  jwt: {
    secret: process.env.AUTH_SECRET || "default",
    expiresIn: "1d"
  }
}
  /* secret --- Property contendo uma palavra-chave qualquer, usado pra gerar o token
            process.env.AUTH_SECRET --- forma de se esconder o dado sensível usando uma variável de ambiente;
                                        a var. de ambiente está no arquivo ".env"
            || "default" --- se não encontrar a var. ambiente, usar "default"
     expiresIn --- Property que determina em quanto tempo o token vai expirar */
