'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.belongsTo(models.User, { foreignKey: 'id_user' });
      Employee.belongsTo(models.Department, { foreignKey: 'department_id' });
      Employee.belongsTo(models.Position, { foreignKey: 'position_id' });
    }
  }

  Employee.init({
    employee_nik: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM('W', 'M'),
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    employment_status: {
      type: DataTypes.ENUM('Permanent', 'Contract', 'Probation', 'Outsourced', 'Intern', 'Resigned'),
      allowNull: false,
    },
    join_date: DataTypes.DATEONLY,
    resignation_date: DataTypes.DATEONLY,
    npwp_number: DataTypes.STRING(20),
    pt_kp: {
      type: DataTypes.ENUM('TK0', 'TK1', 'TK2', 'TK3', 'K0', 'K1', 'K2', 'K3'),
      allowNull: false,
    },
    bank_account_number: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    bank_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    position_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Employee',
    tableName: 'employees',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    deletedAt: 'deleted_at',
  });

  return Employee;
};
