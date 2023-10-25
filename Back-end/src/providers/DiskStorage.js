// Disk Storage --- arq. que contém as funções salvar/deletar de uma foto vinda de upload


const fs = require('fs')
  // módulo "fs" do Node ---- serve pra trabalhar com manipulação de arquivos; nativo do próprio Node

const path = require('path')
  // serve pra lidar com a navegação dos diretórios

const uploadConfig = require('../configs/upload')


class DiskStorage {

  async saveFile(file) {

    await fs.promises.rename(
      /* fs.promises --- API que contém um grupo de Methods assíncronos, que retornam objetos através de Promises
         rename(oldPath, newPath) --- Method que renomeia ou realoca o arq. do "oldPath" pro "newPath" (nesse caso, resolve a Promise ao mudar o arq. de local;
                                      oldPath --- onde o arq. está/como se chama, agora
                                      newPath --- pra onde o arq. deve ser levado/renomeado */
      
      path.resolve(uploadConfig.TMP_FOLDER, file),
      
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
        /* path.resolve() --- Method usado pra direcionar uma sequência de caminhos (path-segments) até a criação do "absolute path" final
                              esses caminhos tem que ser resolvidos, pois variam entre diferentes sistemas operacionais (ex: windows, linux)
                              se lê da direita pra esquerda (entre as ","), onde o valor mais à esq. é o "absolute path" */
    )

    return file
  }


  async deleteFile(file) {

    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    
    try {
      await fs.promises.stat(filePath)
        /* stat(path) --- Method que retorna infos./ o status (ex: se está aberto, corrompido, etc) do dado arq.
                          deve conter um "path" (como parâmetro)
                          a Promise é resolvida ao se retornar o obj. "fs.Stats" relativo ao "path" citado */
    } catch {
      return
    }
      // "try/catch" nesse caso é pra lidar com possíveis erros nos arqs. de upload (ex: o arq. não existe mais e dá crash na aplicação)

    await fs.promises.unlink(filePath)
      /* unlink(path) --- Method que remove um arq. do filesystem;
                          deve conter um "path" (como parâmetro) contendo o endereço de onde o arq. está */
  }
}


module.exports = DiskStorage
