import { Sequelize, Op } from 'sequelize'
import type { Options } from 'sequelize'
import Config from './Config'

const mysqlDatabaseConfig: Options = {
  // 打开哪个数据库
  database: Config.MYSQL.DB_NAME,
  // 用户名
  username: Config.MYSQL.USER_NAME,
  // 密码
  password: Config.MYSQL.PASSWORD,
  // 使用哪个数据库程序
  dialect: 'mysql',
  // 地址
  host: Config.MYSQL.HOST,
  // 端口
  port: Config.MYSQL.PORT,
  // 连接池
  // pool: {
  //   max: 5,
  //   min: 0,
  //   acquire: 30000,
  //   idle: 10000
  // },
  // 数据表相关的全局配置
  define: {
    // 是否冻结表名
    // 默认情况下，表名会转换为复数形式
    freezeTableName: true,
    // 是否为表添加 createdAt 和 updatedAt 字段
    // createdAt 记录表的创建时间
    // updatedAt 记录字段更新时间
    timestamps: false,
    // 是否为表添加 deletedAt 字段
    // 默认情况下, destroy() 方法会删除数据，
    // 设置 paranoid 为 true 时，将会更新 deletedAt 字段，并不会真实删除数据。
    paranoid: false,
  },
}
console.log('配置sequelize')
const sequelize = new Sequelize(mysqlDatabaseConfig)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err)
  })

export { sequelize, Op }
