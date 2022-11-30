import Koa, { Context } from 'koa'
import http from 'http'
import koaBody from 'koa-body'
import cors from 'koa2-cors'
import path from 'path'
import { getAllFilesExport } from '../common/utils/utils'
import Router from 'koa-router'
import Config from '../config/Config'
import catchError from '../middleware/common/catchError'
import { initPlugin } from '../plugin/index'
import '../models/index'
class Init {
  public static app: Koa<Koa.DefaultState, Koa.DefaultContext>
  public static server: http.Server
  public static initCore(app: Koa<Koa.DefaultState, Koa.DefaultContext>, server: http.Server) {
    Init.app = app
    Init.server = server
    Init.corsServer()
    Init.loadBodyParser()
    Init.initCatchError()
    Init.initLoadRouters()
    Init.initPlugin()
  }

  //处理跨域
  public static corsServer() {
    Init.app.use(
      cors({
        origin: '*',
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
      })
    )
  }

  // 解析body参数
  public static loadBodyParser() {
    Init.app.use(
      koaBody({
        multipart: true, // 支持文件上传
        // encoding: 'gzip',
        formidable: {
          maxFieldsSize: 2 * 1024 * 1024, // 最大文件为2兆
          keepExtensions: true // 保持文件的后缀
        }
      })
    )
  }

  // http路由加载
  static async initLoadRouters() {
    const dirPath = path.join(`${process.cwd()}/${Config.BASE}/router/`)
    getAllFilesExport(dirPath, (file: Router) => {
      Init.app.use(file.routes())
      Init.app.use(file.allowedMethods())
    })
  }

  // 错误监听和日志处理
  public static initCatchError() {
    Init.app.use(catchError)
  }

  public static initPlugin() {
    initPlugin({
      pluginNames: ['WebSocket'],
      app: Init.app,
      server: Init.server
    })
  }
}

export default Init.initCore
