import { Context } from 'koa'
import { Op } from '../config/sequelize'
import models from '../models/index'
import { formatTime } from '../common/utils/format'

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

class ArticleService {
  async PublishArticle(article: UpdateArticle) {
    const ll_id = new Date().getTime()
    const result = await models.Article.create({ ll_id, ...article })
    return result
  }

  async removeArticle(ll_id: string) {
    const result = await models.Article.destroy({
      where: {
        ll_id
      }
    })
    return result
  }

  async updateArticle(article: UpdateArticle) {
    const { ll_id, ll_title, ll_introduce, ll_content, ll_content_html, ll_category, ll_tags, ll_cover } = article

    delete article.ll_id
    !ll_title && delete article.ll_title
    !ll_introduce && delete article.ll_introduce
    !ll_content && delete article.ll_content
    !ll_content_html && delete article.ll_content_html
    !ll_category && delete article.ll_category
    !ll_tags && delete article.ll_tags
    !ll_cover && delete article.ll_cover

    const result = await models.Article.update(article, {
      where: {
        ll_id
      }
    })
    return result
  }

  async getSingleArticleById(ll_id: string) {
    const res = await models.Article.findOne({
      where: {
        ll_id
      }
    })
    return res
  }

  async getArticleList(params) {
    interface RequestBody {
      pageSize?: number
      pageNum?: number
      ll_title?: string
      ll_category?: string
    }
    const { pageSize, pageNum, ll_title, ll_category } = params as RequestBody

    const filterCondition = {
      ll_category,
      ll_title: {
        [Op.like]: `%${ll_title}%` // 模糊查询
      }
    }

    // 如果不存在查询条件则删除
    !ll_category && delete filterCondition.ll_category
    !ll_title && delete (filterCondition as Partial<typeof filterCondition>).ll_title

    const res = await models.Article.findAndCountAll({
      where: filterCondition,
      pageNum: (pageNum! * 1 - 1) * pageSize!,
      pageSize: Number(pageSize)
    })

    return res
  }

  async getRecentArticle() {
    const gap = 1000 * 60 * 60 * 24 * 30
    const endTime = Date.now()
    const startTime = endTime - gap
    const data = await models.Article.findAll({
      where: {
        [Op.and]: [
          {
            ll_updatedTime: {
              [Op.between]: [formatTime(startTime), formatTime(endTime)]
            }
          }
        ]
      },
      order: [['ll_id', 'DESC']]
    })

    return data
  }
}

export default new ArticleService()
