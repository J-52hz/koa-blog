const Sequelize = require('sequelize')
export default function (sequelize, DataTypes) {
  return sequelize.define(
    'll_users',
    {
      ll_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
      },
      ll_username: {
        type: DataTypes.STRING(11),
        allowNull: false,
        primaryKey: true
      },
      ll_password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      ll_email: {
        type: DataTypes.STRING(20),
        allowNull: true
      },
      ll_sex: {
        type: DataTypes.CHAR(1),
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
      },
      ll_permission: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      ll_description: {
        type: DataTypes.STRING(150),
        allowNull: true
      }
    },
    {
      sequelize,
      tableName: 'll_users',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'll_id' }, { name: 'll_username' }]
        }
      ]
    }
  )
}
