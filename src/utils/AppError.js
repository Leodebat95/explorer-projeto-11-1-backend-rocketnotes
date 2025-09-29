/* utils (4º/5) --- parte responsável por tratar exceções e erros da aplicação;
                    esse arquivo serve pra padronizar a mensagem 
                    que aparecerá quando ocorrerem exceções */

class AppError {

  message;
  statusCode;

  constructor(message, statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}
/* em uma "constructor()":
     this --- o "this.message" é o "message;" lá de cima (Campo de Classe);
          --- o "this.message" recebe o "message" externo (parâmetro)
     parâmetro "message" --- carrega o "argumento" declarado em "new x.." 
                             pra Instância, como value-inicial dela */

module.exports = AppError
