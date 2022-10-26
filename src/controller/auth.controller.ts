import { Success } from './../core/HttpException'
import type { Context, Next } from 'koa'
import jwt from 'jsonwebtoken'

import config from '../config/Config'

class AuthController {
  async login(ctx: Context, next: Next) {
    const { id, name } = ctx.state.user
    const token = jwt.sign({ id, name }, config.KEYS.PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24,
      algorithm: 'RS256'
    })

    throw new Success(token, '登陆成功')
  }

  async success(ctx: Context, next: Next) {
    throw new Success('token验证成功')
  }
}

export default new AuthController()
