// model/payroll-period
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PayrollPeriod extends Model {
    static associate(models) {}
  }

  PayrollPeriod.init(
    {
      period_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      period_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      payroll_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Open", "Closed"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PayrollPeriod",
      tableName: "payroll_periods",
      timestamps: false,
    }
  );

  return PayrollPeriod;
};
