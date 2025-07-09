// model/payrolldetails
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PayrollDetail extends Model {
    static associate(models) {
      PayrollDetail.belongsTo(models.Employee, {
        foreignKey: "employee_id",
      });
      PayrollDetail.belongsTo(models.PayrollPeriod, {
        foreignKey: "period_id",
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
      period_id: DataTypes.INTEGER,
      employee_id: DataTypes.INTEGER,
      total_working_days: DataTypes.INTEGER,
      total_attendance_days: DataTypes.INTEGER,
      base_salary: DataTypes.DECIMAL(15, 2),
      total_allowances: DataTypes.DECIMAL(15, 2),
      total_overtime_pay: DataTypes.DECIMAL(15, 2),
      gross_salary: DataTypes.DECIMAL(15, 2),
      pph21_deduction: DataTypes.DECIMAL(15, 2),
      bpjs_kesehatan_deduction: DataTypes.DECIMAL(15, 2),
      bpjs_ketenagakerjaan_deduction: DataTypes.DECIMAL(15, 2),
      other_deductions: DataTypes.DECIMAL(15, 2),
      total_deductions: DataTypes.DECIMAL(15, 2),
      net_salary: DataTypes.DECIMAL(15, 2),
      payroll_status: DataTypes.STRING(20),
      payment_date: DataTypes.DATE,
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
