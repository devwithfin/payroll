'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Allowance extends Model {
    static associate(models) {
      // relasi dengan model lain bisa ditambahkan nanti jika diperlukan
    }
  }

  Allowance.init({
    allowance_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    allowance_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    is_taxable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_fixed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Allowance',
    tableName: 'allowances',
    timestamps: false
  });

  return Allowance;
};
