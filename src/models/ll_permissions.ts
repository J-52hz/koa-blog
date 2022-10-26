import Sequelize from 'sequelize'
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'll_permissions',
    {
      ll_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      ll_permission_name: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      ll_permission_val: {
        type: DataTypes.STRING(30),
        allowNull: true,
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
      ll_level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ll_pid: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'll_permissions',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'll_id' }],
        },
      ],
    }
  )
}
