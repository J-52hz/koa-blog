import { Context } from 'koa'
import { Op } from '../config/Sequelize'
import models from '../models/index'
import { sequelize } from '../config/Sequelize'
import { QueryTypes } from 'sequelize'
class CategoryService {
  async createCategory(ctx: Context) {
    const { ll_category_val, ll_category_name } = ctx.request.body
    const ll_id = new Date().getTime()
    const data = await models.Category.create({
      ll_id,
      ll_category_val,
      ll_category_name
    })
    return data
  }

  async deleteCategory(ll_id) {
    const count = await models.Category.destroy({ where: { ll_id } })
    return count
  }

  async updateCategory(params) {
    const { ll_category_val, ll_category_name } = params
    await models.Category.update({ ll_category_name }, { where: { ll_category_val } })
  }

  async getCategoryList(params) {
    const { pageNum, pageSize, ll_id, ll_category_name } = params
    const filterCondition = {
      ll_id,
      ll_category_name: { [Op.like]: `%${ll_category_name}%` }
    }
    !ll_id && delete filterCondition.ll_id
    !ll_category_name && delete (filterCondition as Partial<typeof filterCondition>).ll_category_name
    const data = await models.Category.findAndCountAll({
      limit: Number(pageNum),
      offset: (Number(pageSize) - 1) * Number(pageNum),
      where: filterCondition
    })
    return data
  }

  async getAllCategory() {
    const data = await models.Category.findAll()
    return data
  }

  async getCategoryByGroup() {
    const fragment =
      'SELECT c.ll_id, c.ll_category_val, c.ll_category_name ,count(a.ll_category) as count FROM  ll_categorys c LEFT JOIN ll_article a ON c.ll_category_val = a.ll_category GROUP BY c.ll_category_val;'
    const data = await sequelize.query(fragment, { type: QueryTypes.SELECT })
    return data
  }
}

export default new CategoryService()
