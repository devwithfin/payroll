'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Deduction extends Model {
    static associate(models) {
      // define associations here (if needed)
    }
  }

  Deduction.init({
    deduction_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    is_recurring: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Deduction',
    tableName: 'deductions',
    timestamps: true,
  });

  return Deduction;
};
