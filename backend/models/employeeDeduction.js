// model/employeededuction
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EmployeeDeduction extends Model {
    static associate(models) {
      EmployeeDeduction.belongsTo(models.Employee, {
        foreignKey: 'employee_id'
      });
      EmployeeDeduction.belongsTo(models.Deduction, {
        foreignKey: 'deduction_id'
      });
    }
  }

  EmployeeDeduction.init({
      emp_deduction_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    deduction_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false
    },
    effective_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'EmployeeDeduction',
    tableName: 'employee_deductions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    deletedAt: 'deleted_at'
  });

  return EmployeeDeduction;
};
