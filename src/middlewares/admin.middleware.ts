import type { Context, Next } from 'koa'
import service from '../service/admin.service'
import { DataBaseFailed } from '../core/HttpException'

async function verifyAdmin(ctx: Context, next: Next) {
  const { ll_username } = ctx.request['body']

  // 查询是否已有用户名
  const result = await service.getAdminByName(ll_username)

  if (result) {
    throw new DataBaseFailed('用户已存在')
  }
  await next()
}

async function handlePassword(ctx: Context, next: Next) {
  const { ll_username, ll_password } = ctx.request['body']
  const result = await service.handlePassword(ll_password)

  ctx.state.ll_password = result
  ctx.state.ll_username = ll_username
  await next()
}

export { verifyAdmin, handlePassword }
