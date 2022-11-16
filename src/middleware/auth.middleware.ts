import { Context, Next } from 'koa'
import service from '../service/admin.service'
import md5password from '../common/utils/md5'
import jwt from 'jsonwebtoken'
import { AuthFailed, Forbidden } from '../core/HttpException'

// const authService = require('../service/auth.service')
import config from '../config/Config'

async function verifyLogin(ctx: Context, next: Next) {
  // 1.获取用户名和密码
  const { ll_username, ll_password } = ctx.request['body']

  // 3、判断用户是否已注册
  const result = await service.getAdminByName(ll_username)

  if (!result) {
    throw new Forbidden('用户未注册')
  }

  // 4、判断密码是否正确
  const encryptPassword = await md5password(ll_password)
  if (encryptPassword != result.ll_password) {
    throw new Forbidden('密码错误')
  }

  ctx.state.user = {
    id: result.ll_id,
    name: result.ll_username
  }

  await next()
}

// 验证token
async function verifyAuth(ctx: Context, next: Next) {
  const authorization = ctx.headers.authorization as string
  if (!authorization) {
    throw new AuthFailed('未传递token', 10004)
  }
  const token = authorization.replace('Bearer ', '')

  //验证token，失败自动throw error
  try {
    jwt.verify(token, config.KEYS.PUBLIC_KEY, {
      algorithms: ['RS256']
    })
  } catch (error) {
    console.log(error)
    throw new AuthFailed('无效token', 10004)
  }
  await next()
}

export { verifyLogin, verifyAuth }
