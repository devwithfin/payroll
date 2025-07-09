// model/deduction
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Deduction extends Model {
    static associate(models) {}
  }

  Deduction.init(
    {
      deduction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      deduction_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      is_recurring: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Deduction",
      tableName: "deductions",
      timestamps: true,
    }
  );

  return Deduction;
};
