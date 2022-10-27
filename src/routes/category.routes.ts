const Router = require('koa-router')
import Config from '../config/Config'
import validator from '../middleware/common/validator'
import { params_newCategory, params_id } from '../common/apiJsonSchema/category'
import pagination from '../common/apiJsonSchema/common/pagination'
import CategoryController from '../controller/category.controller'

const categoryRouter = new Router({ prefix: `${Config.API_PREFIX}category` })

const { createCategory, deleteCategory, updateCategory, getAllCategory, getCategoryList } = CategoryController

// 增加分类
categoryRouter.post('/addCategory', validator(params_newCategory, 'body'), createCategory)

// 删除分类
categoryRouter.post('/removeCategory', validator(params_id, 'body'), deleteCategory)

// 更新分类
categoryRouter.post('/updateCategory', validator(params_newCategory, 'body'), updateCategory)

// 查询所有分类
categoryRouter.post('/getAllCategory', getAllCategory)

// 查询分类列表
categoryRouter.post('/getCategoryList', validator(pagination, 'body'), getCategoryList)

export default categoryRouter
