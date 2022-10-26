import Koa from 'koa'
import http from 'http'
import initCore from './core/Init'
import Config from './config/Config'
const cors = require('koa2-cors')

// 创建koa实例
const app = new Koa()
// 创建服务器
const server: http.Server = new http.Server(app.callback())

// 执行初始化
initCore(app, server)
//处理跨域
app.use(
  cors({
    origin: '*', // 允许来自指定域名请求
    maxAge: 5, // 本次预检请求的有效期，单位为秒。
    methods: ['GET', 'POST'], // 所允许的HTTP请求方法
    alloweHeaders: ['Content-Type', 'Authorization', 'Accept'], // 服务器支持的所有头信息字段
    credentials: true, // 是否允许发送Cookie
  })
)

// 监听端口
app.listen(Config.HTTP_PORT, () => {
  console.log('run success')
  console.log(`app started at port ${Config.HTTP_PORT}...`)
  console.log(process.env.NODE_ENV)
})
