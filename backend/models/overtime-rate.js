'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OvertimeRate extends Model {
    static associate(models) {
      // relasi jika diperlukan
    }
  }

  OvertimeRate.init({
    rate_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    multiplier: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'OvertimeRate',
    tableName: 'overtime_rates',
    timestamps: true
  });

  return OvertimeRate;
};
