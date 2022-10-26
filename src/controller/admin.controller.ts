import type { Context, Next } from 'koa'
import service from '../service/admin.service'
import { QueryFailed, Success } from '../core/HttpException'

class AdminController {
  async create(ctx: Context, next: Next) {
    const { ll_username, ll_password } = ctx.state

    const result = await service.createAdmin(ll_username, ll_password)
    if (!result || result == 0) {
      throw new QueryFailed()
    }
    throw new Success()
  }
}

export default new AdminController()
