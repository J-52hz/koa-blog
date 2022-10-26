const KoaRouter = require('koa-router')
import Config from '../config/Config'
const authRouter = new KoaRouter({ prefix: `${Config.API_PREFIX}auth` })

import validator from '../middlewares/common/validator'
import register from '../common/apiJsonSchema/system/admin/register'

import { verifyLogin, verifyAuth } from '../middlewares/auth.middleware'
import AuthController from '../controller/auth.controller'
const { login, success } = AuthController

// 管理员登陆
authRouter.post('/login', validator(register, 'body'), verifyLogin, login)

// 验证token
authRouter.post('/verify', verifyAuth, success)

export default authRouter
