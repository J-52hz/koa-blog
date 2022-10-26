import Sequelize from 'sequelize'
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'll_tags',
    {
      ll_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      ll_tag_name: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      ll_tag_val: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      ll_createdTime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      ll_updatedTime: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    },
    {
      sequelize,
      tableName: 'll_tags',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'll_id' }],
        },
        {
          name: 'll_tag_val',
          using: 'BTREE',
          fields: [{ name: 'll_tag_val' }],
        },
      ],
    }
  )
}
