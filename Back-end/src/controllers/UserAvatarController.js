// controllers (3º/5)

const knex = require('../database/knex')

const AppError = require('../utils/AppError')

const DiskStorage = require('../providers/DiskStorage')


class UserAvatarController {

  async update(request, response) {

    const user_id = request.user.id
    const avatarFilename = request.file.filename

    const diskStorage = new DiskStorage()

    const user = await knex('users')
      .where({ id: user_id }).first()
    
    if(!user) {

      throw new AppError('Somente usuários autenticados podem mudar a foto de perfil', 401)
    }

    if(user.avatar) {

      await diskStorage.deleteFile(user.avatar)
    }
      // comando pra, se já existir uma imagem de perfil anterior, apagar ela, pra dar espaço pra nova imagem
    
    const filename = await diskStorage.saveFile(avatarFilename)
    user.avatar = filename
      // se não existir uma imagem previamente, dá o comando "filename", que salva o novo avatar (avatarFilename)
    
    await knex('users').update(user).where({ id: user_id })
      // comando final, pra atualizar o avatar

    return response.json(user)
  }
}


module.exports = UserAvatarController
