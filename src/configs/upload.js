// upload --- arq. que contém as configurações pra fazer uploads na aplicação


const path = require("path")

const multer = require('multer')

const crypto = require('crypto')


const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp')
  /* contém a pasta de arquivos temporários, onde a imagem chega primeiramente do upload
     resolve() --- Method que contém o endereçamento da pasta */

const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, 'uploads')
  // contém a pasta de uploads fixa, onde o arq. do upload realmente ficará


const MULTER = {
  // multer indica como vai ser feito o upload

  storage: multer.diskStorage({
    // storage --- Property que indica como o arq. de upload será armazenado

    destination: TMP_FOLDER,
      // destination --- Property que indica pra onde o arq. de upload será mandado

    filename(request, file, callback) {
      // filename --- function pra criar qual será o nome do arq. de upload dentro das pastas de armazenamento

      const fileHash = crypto.randomBytes(10).toString('hex')
        /* crypto --- gera um número aleatório (no caso, usado como identidade do arq. que veio do upload)
                      serve pra garantir que não existam arqs. com nomes iguais;
                          pra não haver imagens duplicadas enviadas no upload, 
                          que vão se substituindo e bagunçando tudo
           "randomBytes" & "toString(hexadecimal...)" --- formas como o crypto vai atuar */

      const fileName = `${fileHash}-${file.originalname}`
        // forma de se associar o número "crypto" com o nome original do arq. que veio do upload

      return callback(null, fileName)
    },
  }),
}


module.exports = {
  TMP_FOLDER,
  UPLOADS_FOLDER,
  MULTER
}
