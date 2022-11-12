import type { Context, Next } from 'koa'
import { Success, QueryFailed } from './../core/HttpException'
import service from '../service/category.service'

class CategoryController {
  async createCategory(ctx: Context) {
    const res = await service.createCategory(ctx)
    throw new Success(res)
  }

  async deleteCategory(ctx: Context) {
    const { ll_id } = ctx.request['body']
    const res = await service.deleteCategory(ll_id)
    if (!res || res == 0) {
      throw new QueryFailed()
    }
    throw new Success()
  }

  async updateCategory(ctx: Context) {
    const params = ctx.request['body']
    await service.updateCategory(params)
    throw new Success()
  }

  async getCategoryList(ctx: Context) {
    const params = ctx.request['body']
    const data = await service.getCategoryList(params)
    if (!data) {
      throw new QueryFailed()
    }
    throw new Success(data)
  }

  async getAllCategory() {
    const data = await service.getAllCategory()
    throw new Success(data)
  }

  async getCategoryByGroup() {
    const data = await service.getCategoryByGroup()
    throw new Success(data)
  }
}

export default new CategoryController()
