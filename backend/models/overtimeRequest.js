'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OvertimeRequest extends Model {
    static associate(models) {
      OvertimeRequest.belongsTo(models.Employee, { foreignKey: 'employee_id' });
      OvertimeRequest.belongsTo(models.Employee, { foreignKey: 'submitted_by', as: 'Submitter' });
      OvertimeRequest.belongsTo(models.Employee, { foreignKey: 'approved_by_hrd', as: 'HRDApprover' });
      OvertimeRequest.belongsTo(models.Employee, { foreignKey: 'approved_by_atasan', as: 'AtasanApprover' });
    }
  }

  OvertimeRequest.init({
    employee_id: DataTypes.INTEGER,
    request_date: DataTypes.DATEONLY,
    overtime_date: DataTypes.DATEONLY,
    start_time: DataTypes.TIME,
    end_time: DataTypes.TIME,
    reason: DataTypes.TEXT,
    submitted_by: DataTypes.INTEGER,
    approval_status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Rejected'),
      defaultValue: 'Pending'
    },
    approved_by_hrd: DataTypes.INTEGER,
    approved_by_atasan: DataTypes.INTEGER,
    approval_date_hrd: DataTypes.DATE,
    approval_date_atasan: DataTypes.DATE,
    notes_approval: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'OvertimeRequest',
    tableName: 'overtime_requests',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    paranoid: true,
    deletedAt: 'deleted_at'
  });

  return OvertimeRequest;
};
