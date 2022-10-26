import Sequelize from 'sequelize'
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'll_reception_users',
    {
      ll_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      ll_username: {
        type: DataTypes.STRING(11),
        allowNull: false,
        primaryKey: true,
      },
      ll_password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      ll_nick_name: {
        type: DataTypes.STRING(16),
        allowNull: false,
        defaultValue: '一只猪',
      },
      ll_avatar: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: 'http://codeleilei.gitee.io/blog/default_avatar.jpeg',
      },
      ll_createdTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      ll_updatedTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      tableName: 'll_reception_users',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'll_id' }, { name: 'll_username' }],
        },
      ],
    }
  )
}
