"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Allowance extends Model {
    static associate(models) {
      Allowance.hasMany(models.EmployeeAllowance, {
        foreignKey: 'allowance_id',
      });
    }
  }

  Allowance.init(
    {
      allowance_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      allowance_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      is_fixed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      default_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Allowance",
      tableName: "allowances",
      timestamps: false,
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      deletedAt: "deleted_at",
    }
  );

  return Allowance;
};
