import Sequelize from 'sequelize'
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'll_article',
    {
      ll_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      ll_title: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      ll_titleEng: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      ll_introduce: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      ll_category: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      ll_tags: {
        type: DataTypes.STRING(100),
        allowNull: true
      },
      ll_visitedCounts: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      ll_likedCounts: {
        type: DataTypes.BIGINT,
        allowNull: true,
        defaultValue: 0
      },
      ll_cover: {
        type: DataTypes.STRING(150),
        allowNull: true
      },
      ll_createdTime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
      },
      ll_updatedTime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
        comment: '创建时间'
      },
      ll_content: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      ll_content_html: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'll_article',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'll_id' }]
        }
      ]
    }
  )
}
