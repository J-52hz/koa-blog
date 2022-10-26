import KoaRouter from 'koa-router'
import Config from '../config/Config'
import validator from '../middlewares/common/validator'
import register from '../common/apiJsonSchema/system/admin/register'

import { verifyAdmin, handlePassword } from '../middlewares/admin.middleware'
import AdminController from '../controller/admin.controller'
const { create } = AdminController

const adminRouter = new KoaRouter({ prefix: `${Config.API_PREFIX}admin` })

// 注册管理员
adminRouter.post('/register', validator(register, 'body'), verifyAdmin, handlePassword, create)

export default adminRouter
