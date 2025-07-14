// model/employee-allowance
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class EmployeeAllowance extends Model {
    static associate(models) {
      EmployeeAllowance.belongsTo(models.Employee, {
        foreignKey: "employee_id",
      });

      EmployeeAllowance.belongsTo(models.Allowance, {
        foreignKey: "allowance_id",
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
      status_processed: {
        type: DataTypes.ENUM("Unprocessed", "Processed"),
        allowNull: false,
        defaultValue: "Unprocessed",
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
