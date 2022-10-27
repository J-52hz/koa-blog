import { QueryFailed, Success } from './../core/HttpException'
import type { Context } from 'koa'
import service from '../service/tag.service'

class TagController {
  async createTag(ctx: Context) {
    service.createTag(ctx)

    ctx.body = {
      success: true,
      msg: '创建标签成功',
      code: 200
    }
  }

  async deleteTag(ctx: Context) {
    const data = await service.deleteTag(ctx)
    if (!data || data == 0) {
      throw new QueryFailed()
    }

    throw new Success()
  }

  async updateTag(ctx: Context) {
    const res = await service.updateTag(ctx)
    if (!res || res == 0) {
      throw new QueryFailed()
    }
    throw new Success()
  }

  async getTagList(ctx: Context) {
    const data = await service.getTagList(ctx)
    if (!data) {
      throw new QueryFailed()
    }
    throw new Success(data)
  }

  async getAllTag() {
    const data = await service.getAllTag()
    throw new Success(data)
  }
}

export default new TagController()
