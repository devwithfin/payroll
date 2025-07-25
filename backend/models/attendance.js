// model/attendance
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    static associate(models) {
      Attendance.belongsTo(models.Employee, {
        foreignKey: "employee_id",
        as: "employee",
      });
    }
  }

  Attendance.init(
    {
      attendance_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      attendance_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      check_in_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      check_out_time: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("Present", "Sick", "Leave", "Absent"),
        allowNull: false,
        defaultValue: "Present",
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      // status_processed: {
      //   type: DataTypes.ENUM("Unprocessed", "Processed"),
      //   allowNull: false,
      //   defaultValue: "Unprocessed",
      // },
    },
    {
      sequelize,
      modelName: "Attendance",
      tableName: "attendances",
      timestamps: false,
    }
  );

  return Attendance;
};
