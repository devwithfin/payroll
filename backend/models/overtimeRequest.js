// model/overtime-request
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OvertimeRequest extends Model {
    static associate(models) {
      OvertimeRequest.belongsTo(models.Employee, {
        foreignKey: "employee_id",
        as: "employee",
      });

      OvertimeRequest.belongsTo(models.Employee, {
        foreignKey: "submitted_by",
        as: "Submitter",
      });

      OvertimeRequest.belongsTo(models.Employee, {
        foreignKey: "approved_by_hrd",
        as: "HRDApprover",
      });

      OvertimeRequest.hasOne(models.CalculatedOvertime, {
        foreignKey: "request_id",
        as: "calculation",
      });
    }
  }

  OvertimeRequest.init(
    {
      request_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_id: DataTypes.INTEGER,
      request_date: DataTypes.DATE,
      overtime_date: DataTypes.DATEONLY,
      start_time: DataTypes.TIME,
      end_time: DataTypes.TIME,
      reason: DataTypes.TEXT,
      submitted_by: DataTypes.INTEGER,
      approval_status: {
        type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
        defaultValue: "Pending",
      },
      approved_by_hrd: DataTypes.INTEGER,
      approval_date_hrd: DataTypes.DATE,
      notes_approval: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "OvertimeRequest",
      tableName: "overtime_requests",
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  return OvertimeRequest;
};
