// model/deduction
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Deduction extends Model {
    static associate(models) {
      Deduction.hasMany(models.EmployeeDeduction, {
        foreignKey: "deduction_id",
      });
    }
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
    },
    {
      sequelize,
      modelName: "Deduction",
      tableName: "deductions",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      deletedAt: "deleted_at",
    }
  );

  return Deduction;
};
