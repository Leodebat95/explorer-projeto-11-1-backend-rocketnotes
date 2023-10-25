/* ------------------- Node - Commands -----------------------------------------------------------------------------------------------

*** Todos os comandos a seguir são postos em um Terminal (criar um novo, no 1º)

Teclar "ctrl + c" com terminal selecionado
    --- encerra um serviço no terminal

Teclar "ctrl + l" com terminal selecionado
    --- limpa o terminal


Express  ------------------------------------------------------------------------------------------------------------------------------
    npm install express --save 
        --- instala o Express no projeto

    node (endereço do local dentro da pasta do projeto)
        --- pra executar a aplicação; end. é sem os (); ex: node src/server.js
        --- outra forma de executar é indo direto no "package.json":
                no "scripts{...}" --- trocar "test..." por "start": "node ./src/server.js"
                dessa forma, aplicação sempre vai inicializar executando automaticamente

    npm start
        --- inicializa manualmente a aplicação / o servidor


Nodemon  ----------------------------------------------------------------------------------------------------------------------------
    npm install nodemon --save-dev
        --- instala a library Nodemon
        --- ela configura o servidor pra que ele reinicie de forma automática toda vez que houver alterações
            sem precisar ficar iniciando o servidor manualmente
        --- devDependency - dependência de desenvolvimento; só se usa essa library enquanto está desenvolvendo, pra ajudar no processo;
                            quando for rodar mesmo, não precisa dela, daí só vai precisar das dependências de produção (ex. Express)
        --- no "package.json", em "scripts" tem que pôr - "dev": "nodemon (local do arquivo - ex: ./src/server.js)"

*** npm run dev
        --- incializa o servidor pelo Nodemon (em ambiente de Desenvolvimento)


Express Async Errors  --------------------------------------------------------------------------------------------------------------
    npm install express-async-errors --save
        --- instala a library Express Async Errors
            ela manipula/trata erros tanto do server-side como client-side


SQLite  ----------------------------------------------------------------------------------------------------------------------------
    npm install sqlite3 sqlite --save
        --- instala a library SQLite, de banco de dados relacional (SQL)


Bcripty  ---------------------------------------------------------------------------------------------------------------------------
    npm install bcryptjs
        --- instala a library Bcripty, que criptografa dados


Knex  ------------------------------------------------------------------------------------------------------------------------------
    npm install knex --save
        --- instala a Query Builder Knex

    npx knex init
        --- gera o arq. de configuração do Knex "knexfile.js"

    npx knex migrate:make nomeDaMigration
        --- cria migrations através do Knex; o nome da migration é escolhido por mim mesmo
    
    npx knex migrate:latest
        --- pra rodar/executar a migration mais recente
    npm run migrate
        --- outra forma de rodar a migration mais recente
        --- porém, aqui é pelo "script" do arquivo "package.json"
            tem que adicionar ao "script" --- "migrate": "knex migrate:latest"
            feito isso, só pôr no terminal "npm run migrate"


JSON Web Token  -------------------------------------------------------------------------------------------------------------------
    npm install jsonwebtoken
        --- instala a library JSON Web Token


Multer  ---------------------------------------------------------------------------------------------------------------------------
    npm install multer
        --- instala a library Multer


CORS  -----------------------------------------------------------------------------------------------------------------------------
    npm install cors
        --- instala a library CORS


dotenv  -----------------------------------------------------------------------------------------------------------------------------
    npm install dotenv --save
        --- instala a library dotenv
    
    .env
        --- arq. que contém as variáveis de ambiente (não é comando no terminal; é o arq.)


PM2  -----------------------------------------------------------------------------------------------------------------------------
    npx pm2 init
        --- executa o gerenciador de processos PM2
            gera o arq. "ecosystem.config.js"

    npm install pm2
        --- instala a library PM2
        --- pra funcionar, tem que trocar no arq. "package.json", em "scripts"
            tirar:
                "start": "node ./src/server.js"
            pôr:        
                "start": "pm2-runtime start ecosystem.config.js --env production"

*** npm start
        --- incializa o servidor pelo PM2 (em ambiente de Produção)

*/
