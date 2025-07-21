'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CalculatedOvertime extends Model {
    static associate(models) {
      CalculatedOvertime.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
      });
      CalculatedOvertime.belongsTo(models.OvertimeRequest, {
        foreignKey: 'request_id',
      });
    }
  }

  CalculatedOvertime.init(
    {
      calculated_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      request_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      overtime_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      start_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      duration_minutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      overtime_amount: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      calculation_details: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'CalculatedOvertime',
      tableName: 'calculated_overtimes',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      paranoid: true,
      deletedAt: 'deleted_at',
    }
  );

  return CalculatedOvertime;
};
