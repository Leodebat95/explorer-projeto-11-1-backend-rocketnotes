// arq. contendo a lógica do repositório de Testes (In Memory, fica dentro da memória do pc)


class UserRepositoryInMemory {

  users = []


  async create({ email, name, password }) {

    const user = {

      id: Math.floor(Math.random() * 1000) + 1,
        // forma de se criar um número aleatório pro "id"
      email,
      name,
      password
    }

    this.users.push(user)
      /* this.users --- se usa o "this", pois "users" está no escopo da "class"
         push() --- Array-Method que adiciona item no final do array */
    
    return user
  }


  async findByEmail(email) {

    return this.users.find( user => user.email === email)
      // find() --- Array-Method que retorna o valor do 1º item do array que passa no teste/condição
  }
}


module.exports = UserRepositoryInMemory
