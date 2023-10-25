// * esses códigos ficavam dentro de "users.routes"

app.get('/message/:id/:user', (request, response) => {

  response.send(`Id da mensagem: ${request.params.id}. Para o usuário: ${request.params.user}.`)
})
      /* get(x, function(request, response)) --- Method GET; requisição http que o "express" gerencia
                  x --- endereço de onde a API vai ler a info
                                route --- as rotas são o endereço entre /.../ --- ex: /message/
                                params --- o ":" identifica que é um parâmetro; "id" e "user" são termos quaisquer definidos por mim
                  function() --- o que vai acontecer ao chegar no end. 
                                request --- obter infos. que foram enviadas para API
                                response --- resposta devolvida pela API */


app.get('/users', (request, response) => {

  response.send(`Página: ${request.query.page}. Mostrar: ${request.query.limit}`)
})
        /* request.params --- Route Params
                    Property pra passar os dados da requisição (params) pela rota, e são usados pra passar dados mais simples
                        usados pra identificar algo
                        são obrigatórios pra página ser localizada
                    ex --- GET /cars/:id

            request.query --- Query Params
                    Property pra passar os dados da requisição como parâmetro na URL, através de "?chave=valor"
                        se for mais de um, são conectados por "&"
                        usados pra filtrar algo
                        são opcionais pra página ser localizada
                    ex --- GET /cars?color=blue&brand=ferrari */
