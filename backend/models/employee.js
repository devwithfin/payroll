"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.belongsTo(models.Position, {
        foreignKey: "position_id",
        as: "position",
      });

      Employee.belongsTo(models.Department, {
        foreignKey: "department_id",
        as: "department",
      });

      Employee.hasOne(models.User, {
        foreignKey: "employee_id",
        as: "user",
      });

      Employee.hasMany(models.EmployeeAllowance, {
        foreignKey: "employee_id",
      });

      Employee.hasMany(models.OvertimeRequest, {
        foreignKey: "employee_id",
        as: "overtimeRequestsAsEmployee",
      });

      Employee.hasMany(models.OvertimeRequest, {
        foreignKey: "submitted_by",
        as: "overtimeRequestsAsSubmitter",
      });

      Employee.hasMany(models.OvertimeRequest, {
        foreignKey: "approved_by_hrd",
        as: "overtimeRequestsAsHRDApprover",
      });

    }
  }

  Employee.init(
    {
      employee_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      id_user: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true,
      },
      position_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("HR", "Finance", "Employee"),
        allowNull: false,
      },
      employee_nik: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
      },
      full_name: DataTypes.STRING(100),
      dob: DataTypes.DATEONLY,
      gender: DataTypes.ENUM("W", "M"),
      address: DataTypes.TEXT,
      phone_number: DataTypes.STRING(15),
      email: DataTypes.STRING(100),
      employment_status: DataTypes.ENUM(
        "Permanent",
        "Contract",
        "Probation",
        "Outsourced",
        "Intern",
        "Resigned"
      ),
      join_date: DataTypes.DATEONLY,
      resignation_date: DataTypes.DATEONLY,
      npwp_number: DataTypes.STRING(20),
      pt_kp: DataTypes.ENUM("TK0", "TK1", "TK2", "TK3", "K0", "K1", "K2", "K3"),
      bank_account_number: DataTypes.STRING(30),
      bank_name: DataTypes.STRING(50),
    },
    {
      sequelize,
      modelName: "Employee",
      tableName: "employees",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      deletedAt: "deleted_at",
    }
  );

  return Employee;
};
