const Router = require('koa-router')
import Config from '../config/Config'
import validator from '../middleware/common/validator'
import { params_tag, params_id } from '../common/apiJsonSchema/tags'
import TagController from '../controller/tag.controller'
import pagination from '../common/apiJsonSchema/common/pagination'

const tagRouter = new Router({ prefix: `${Config.API_PREFIX}tag` })

const { createTag, deleteTag, updateTag, getAllTag, getTagList } = TagController

// 增加tag
tagRouter.post('/addTag', validator(params_tag, 'body'), createTag)

// 删除tag
tagRouter.post('/removeTag', validator(params_id, 'body'), deleteTag)

// 更新tag
tagRouter.post('/updateTag', validator(params_tag, 'body'), updateTag)

// 查询所有tag
tagRouter.post('/getAllTag', getAllTag)

// 查询tag列表
tagRouter.post('/getTagList', validator(pagination, 'body'), getTagList)

export default tagRouter
