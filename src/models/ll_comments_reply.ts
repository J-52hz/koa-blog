import Sequelize from 'sequelize'
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'll_comments_reply',
    {
      ll_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      ll_nick_name: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      ll_username: {
        type: DataTypes.STRING(11),
        allowNull: false,
        primaryKey: true,
      },
      ll_createdTime: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      ll_content: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      ll_pid: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      ll_p_username: {
        type: DataTypes.STRING(11),
        allowNull: true,
      },
      ll_avatar: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      ll_p_nick_name: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      ll_level: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'll_comments_reply',
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
