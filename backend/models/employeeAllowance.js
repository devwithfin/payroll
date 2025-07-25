// model/employee-allowance
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EmployeeAllowance extends Model {
    static associate(models) {
      EmployeeAllowance.belongsTo(models.Employee, {
        foreignKey: "employee_id",
        as: "employee",
      });

      EmployeeAllowance.belongsTo(models.Allowance, {
        foreignKey: "allowance_id",
        as: "allowance",
      });
    }
  }

  EmployeeAllowance.init(
    {
      emp_allowance_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      allowance_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      effective_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "EmployeeAllowance",
      tableName: "employee_allowances",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      deletedAt: "deleted_at",
    }
  );

  return EmployeeAllowance;
};
