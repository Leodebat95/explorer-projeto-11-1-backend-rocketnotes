const UserCreateService = require('./UserCreateService')

const UserRepositoryInMemory = require('../repositories/UserRepositoryInMemory')
  // forma de importar o repositório-teste

const AppError = require('../utils/AppError')



describe("UserCreateService", () => {

  it("user should be created", async () => {

    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    }
      // "user" é um usuário de exemplo; serve para que o teste possa rodar uma simulação
    
    const userRepositoryInMemory = new UserRepositoryInMemory()
    
    const userCreateService = new UserCreateService(userRepositoryInMemory)
      // o repositório-teste (userRepositoryInMemory) é usado no "userCreateService"
  
    const userCreated = await userCreateService.execute(user)
  
    expect(userCreated).toHaveProperty("id")
      // testa se em "userCreated" existe a Property "id"
  })


  it("another test example", () => {

    expect(1).toBe(1)
  })


  it("user should not be created if user's email is repeated", async () => {

    const user1 = {
      name: "User Test 1",
      email: "user@test.com",
      password: "123"
    }

    const user2 = {
      name: "User Test 2",
      email: "user@test.com",
      password: "123"
    }

    const userRepository = new UserRepositoryInMemory()

    const userCreateService = new UserCreateService(userRepository)

    await userCreateService.execute(user1)
      // comando pra cadastrar o 1º usuário
    
    await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este email já está em uso."))
      /* tentativa de se cadastrar o 2º usuário (ele contém o mesmo email do "user1")
              rejects --- Property indicando que se espera que o cadastramento do "user2" seja rejeitado
              toEqual() --- Method que diz que o cadastramento falho do "user2" deve ser igual ao "new AppError("...")" */
  })
})


/* describe("x", y) --- Method que agrupa e organiza testes por assunto (switches de testes);
                  "x" --- nome do grupo/switch
                  y --- arrow f. contendo os testes (cada teste é um "it" method) */


/* it("x", y) --- Method que realiza o teste;
                "x" --- descrição objetiva do que o teste deve fazer
                y --- function em si, que realiza o teste

   expect(var) --- Method que contém a variável que deve ser analisada;
                   se a expectativa for atendida, significa que o teste passou; do contrário, o teste não passou

   Matchers --- são Methods do Jest que verificam a veracidade das frases/afirmações dos testes
                ex: "expect(result).toEqual(4)"--- é o "toEqual()"


   Ex:

   it("result of the sum of 2 + 2 must be 4", () => {

     const a = 2
     const b = 2
     const result = a + b

     expect(result).toEqual(4)
   })
*/
