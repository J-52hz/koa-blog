import KoaRouter from 'koa-router'
import Config from '../config/Config'
import validator from '../middleware/common/validator'
import register from '../common/apiJsonSchema/admin/register'

import { verifyAdmin, handlePassword } from '../middleware/admin.middleware'
import AdminController from '../controller/admin.controller'
const { create } = AdminController

const adminRouter = new KoaRouter({ prefix: `${Config.API_PREFIX}` })

// 注册管理员
adminRouter.post('/register', validator(register, 'body'), verifyAdmin, handlePassword, create)

export default adminRouter
