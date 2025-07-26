// model/payroll-detail
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PayrollDetail extends Model {
    static associate(models) {
      PayrollDetail.belongsTo(models.Employee, {
        foreignKey: "employee_id",
        as: "employee",
      });
      PayrollDetail.belongsTo(models.PayrollPeriod, {
        foreignKey: "period_id",
        as: "period",
      });
    }
  }

  PayrollDetail.init(
    {
      payroll_detail_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      period_id: {
        type: DataTypes.INTEGER,
      },
      employee_id: {
        type: DataTypes.INTEGER,
      },
      total_working_days: DataTypes.INTEGER,
      total_attendance_days: DataTypes.INTEGER,
      base_salary: DataTypes.DECIMAL(15, 2),
      total_allowances: DataTypes.DECIMAL(15, 2),
      total_overtime_pay: DataTypes.DECIMAL(15, 2),
      gross_salary: DataTypes.DECIMAL(15, 2),
      pph21_deduction: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      bpjs_kesehatan_deduction: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      bpjs_ketenagakerjaan_deduction: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      other_deductions: DataTypes.DECIMAL(15, 2),
      total_deductions: DataTypes.DECIMAL(15, 2),
      net_salary: DataTypes.DECIMAL(15, 2),
      payroll_status: {
        type: DataTypes.ENUM("Draft", "Final"),
        allowNull: false,
        defaultValue: "Draft",
      },
      is_paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      payment_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "PayrollDetail",
      tableName: "payroll_details",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      deletedAt: "deleted_at",
    }
  );

  return PayrollDetail;
};
