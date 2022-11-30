const Router = require('koa-router')
import Config from '../config/Config'
import ArticleController from '../controller/article.controller'
import validator from '../middleware/common/validator'
import { params_id, params_article } from '../common/apiJsonSchema/article'
import pagination from '../common/apiJsonSchema/common/pagination'
import { verifyAuth } from '../middleware/auth.middleware'

const articleRouter = new Router({ prefix: `${Config.API_PREFIX}article` })

const { publish, remove, update, getSingleArticle, getArticleList, getRecentArticle, getAllArticle, getArticleByName } =
  ArticleController

// 创建文章
articleRouter.post('/publish', verifyAuth, validator(params_article, 'body'), publish)

// 删除文章
articleRouter.post('/remove', verifyAuth, validator(params_id, 'body'), remove)

//更新文章
articleRouter.post('/update', verifyAuth, validator(params_id, 'body'), update)

// 查询单个文章
articleRouter.post('/getSingleArticle', verifyAuth, validator(params_id, 'body'), getSingleArticle)

// articleRouter.post('/getArticleById', getArticleById)
articleRouter.post('/getArticleByName', getArticleByName)

// 查询文章列表
articleRouter.post('/getArticleList', verifyAuth, validator(pagination, 'body'), getArticleList)

// 查询所有文章
articleRouter.post('/getAllArticle', getAllArticle)

// 查询最近文章
articleRouter.post('/getRecentArticle', verifyAuth, getRecentArticle)

export default articleRouter
