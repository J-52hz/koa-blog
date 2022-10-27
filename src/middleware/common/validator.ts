import Ajv from 'ajv'
import { Schema } from 'ajv'
import Config from '../../config/Config'
import { Models } from '../../common/typings/model'
import { ParameterException } from '../../core/HttpException'

// import ajvKeywords from 'ajv-keywords'
const ajv = new Ajv({ allErrors: Config.IS_DEV }) //是否输出所有的错误（比较慢）
require('ajv-keywords')(ajv)

/**
 * json schema 校验
 * @param schema
 * @param data
 * @returns
 */
function validate(schema: string | Schema, data = {}) {
  try {
    const valid: boolean = ajv.validate(schema, data)
    if (!valid) {
      return ajv.errorsText()
    }
  } catch (error) {
    console.log(error)
  }
}

// 请求参数类型
type RequestDataType = 'query' | 'body'
/**
 * 数据校验中间件
 */
function validator(schema: string | boolean | object, type: RequestDataType = 'query') {
  return async function validator(ctx: Models.Ctx, next: Function) {
    const data = ctx.request[type]
    const errors = validate(schema, data) || null
    if (errors) {
      console.log('数据校验失败')
      //校验失败
      throw new ParameterException(errors)
    }
    await next()
  }
}
export default validator
