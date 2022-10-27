const Router = require('koa-router')
import Config from '../config/Config'
import ArticleController from '../controller/article.controller'
import validator from '../middleware/common/validator'
import { params_id, params_article } from '../common/apiJsonSchema/article'
import pagination from '../common/apiJsonSchema/common/pagination'

const articleRouter = new Router({ prefix: `${Config.API_PREFIX}article` })

const { publish, remove, update, getSingleArticle, getArticleList, getRecentArticle } = ArticleController

// 创建文章
articleRouter.post('/publish', validator(params_article, 'body'), publish)

// 删除文章
articleRouter.post('/remove', validator(params_id, 'body'), remove)

//更新文章
articleRouter.post('/update', validator(params_id, 'body'), update)

// 查询单个文章
articleRouter.post('/getSingleArticle', validator(params_id, 'body'), getSingleArticle)

// 查询文章列表
articleRouter.post('/getArticleList', validator(pagination, 'body'), getArticleList)

// 查询最近文章
articleRouter.post('/getRecentArticle', getRecentArticle)

export default articleRouter
