import md5password from '../common/utils/md5'
import models from '../models/index'

// User extends

class AdminService {
  async getAdminByName(name: string) {
    const result = await models.User.findOne({
      where: {
        ll_username: name
      }
    })
    return result
  }

  async handlePassword(password: string) {
    const result = await md5password(password)
    return result
  }

  async createAdmin(name: string, password: string) {
    const ll_id = new Date().getTime()
    const result = await models.User.create({
      ll_id,
      ll_username: name,
      ll_password: password
    })
    console.log(result)
    return result
  }
}

export default new AdminService()
