import { sequelize } from '../config/sequelize'
const DataTypes = require('sequelize').DataTypes
const _ll_article = require('./ll_article')
const _ll_article_comments = require('./ll_article_comments')
const _ll_article_comments_reply = require('./ll_article_comments_reply')
const _ll_categorys = require('./ll_categorys')
const _ll_comments = require('./ll_comments')
const _ll_comments_reply = require('./ll_comments_reply')
const _ll_permissions = require('./ll_permissions')
const _ll_reception_users = require('./ll_reception_users')
const _ll_tags = require('./ll_tags')
import _ll_users from './ll_users'

function initModels(sequelize) {
  const Article = _ll_article(sequelize, DataTypes)
  const ArticleComments = _ll_article_comments(sequelize, DataTypes)
  const ArticleCommentsReply = _ll_article_comments_reply(sequelize, DataTypes)
  const Category = _ll_categorys(sequelize, DataTypes)
  const Comments = _ll_comments(sequelize, DataTypes)
  const CommentsReply = _ll_comments_reply(sequelize, DataTypes)
  const Permission = _ll_permissions(sequelize, DataTypes)
  const ReceptionUsers = _ll_reception_users(sequelize, DataTypes)
  const Tags = _ll_tags(sequelize, DataTypes)
  const User = _ll_users(sequelize, DataTypes)

  return {
    Article,
    ArticleComments,
    ArticleCommentsReply,
    Category,
    Comments,
    CommentsReply,
    Permission,
    ReceptionUsers,
    Tags,
    User
  }
}

export default initModels(sequelize)
