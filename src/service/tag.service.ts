import type { Context } from 'koa'
import { Op } from '../config/sequelize'
import models from '../models/index'

class TagService {
  async createTag(ctx: Context) {
    const { ll_tag_val, ll_tag_name } = ctx.request.body
    const ll_id = new Date().getTime()
    const data = await models.Tags.create({
      ll_id,
      ll_tag_val,
      ll_tag_name
    })
    return data
  }

  async deleteTag(ctx: Context) {
    const { ll_id } = ctx.request.body
    try {
      const count = await models.Tags.destroy({ where: { ll_id } })
      return count
    } catch (error) {
      return false
    }
  }

  async updateTag(ctx: Context) {
    const { ll_tag_val, ll_tag_name } = ctx.request.body
    const res = await models.Tags.update({ ll_tag_name }, { where: { ll_tag_val } })
    return res
  }

  async getTagList(ctx: Context) {
    const { pageNum, pageSize, ll_id, ll_tag_name } = ctx.request.body
    const filterCondition = {
      ll_id,
      ll_tag_name: { [Op.like]: `%${ll_tag_name}%` }
    }
    !ll_id && delete filterCondition.ll_id
    !ll_tag_name && delete (filterCondition as Partial<typeof filterCondition>).ll_tag_name
    const data = await models.Tags.findAndCountAll({
      limit: Number(pageNum),
      offset: (Number(pageSize) - 1) * Number(pageNum),
      where: filterCondition
    })
    return data
  }

  async getAllTag() {
    const data = await models.Tags.findAll()
    return data
  }
}

export default new TagService()
