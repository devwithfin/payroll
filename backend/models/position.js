'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    static associate(models) {
      // Jika ada relasi lain nanti
      Position.hasMany(models.Employee, {
        foreignKey: 'position_id'
      });
    }
  }

  Position.init({
  position_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  base_salary: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Position',
  tableName: 'positions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  paranoid: true,
  deletedAt: 'deleted_at'
});


  return Position;
};
