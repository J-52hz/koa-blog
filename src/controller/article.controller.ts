import { Success, QueryFailed } from './../core/HttpException'
import { Context, Next } from 'koa'
import service from '../service/article.service'
const {
  PublishArticle,
  removeArticle,
  updateArticle,
  getSingleArticleById,
  getArticleList,
  getRecentArticle,
  getAllArticle,
  getArticleByName
} = service

interface UpdateArticle {
  ll_id?: string
  ll_title?: string
  ll_introduce?: string
  ll_content?: string
  ll_content_html?: string
  ll_category?: string
  ll_tags?: string
  ll_cover?: string
}

class ArticleController {
  async publish(ctx: Context) {
    const article = ctx.request['body']

    const res = await PublishArticle(article)

    throw new Success(res, '文章创建成功')
  }

  async remove(ctx: Context) {
    const { ll_id } = ctx.request['body']
    const res = await removeArticle(ll_id)
    if (!res || res == 0) {
      throw new QueryFailed('该文章不存在')
    }
    throw new Success(null, '文章删除成功')
  }

  async update(ctx: Context) {
    const article = ctx.request.body as UpdateArticle

    const res = await updateArticle(article)
    if (!res || res == 0) {
      throw new QueryFailed('该文章不存在或内容未实际修改')
    }
    throw new Success()
  }

  async getSingleArticle(ctx: Context) {
    const { ll_id } = ctx.request.body
    const res = await getSingleArticleById(ll_id)

    if (!res) {
      throw new QueryFailed('文章不存在')
    }
    throw new Success(res)
  }

  async getArticleList(ctx: Context) {
    const params = ctx.request['body']
    const res = await getArticleList(params)
    throw new Success(res)
  }

  async getRecentArticle(ctx: Context) {
    const res = await getRecentArticle()

    throw new Success(res)
  }

  async getAllArticle() {
    const res = await getAllArticle()

    throw new Success(res)
  }
  async getArticleByName(ctx: Context) {
    const { ll_titleEng } = ctx.request['body']
    const res = await getArticleByName(ll_titleEng)

    throw new Success(res)
  }
}

export default new ArticleController()
