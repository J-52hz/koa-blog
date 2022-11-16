import Sequelize from 'sequelize'

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'll_categorys',
    {
      ll_category_val: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true
      },
      ll_id: {
        type: DataTypes.BIGINT,
        allowNull: false
      },
      ll_category_name: {
        type: DataTypes.STRING(20),
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
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },
    {
      sequelize,
      tableName: 'll_categorys',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'll_category_val' }]
        }
      ]
    }
  )
}
