// model/overtime-rate
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class OvertimeRate extends Model {
    static associate(models) {}
  }

  OvertimeRate.init(
    {
      rate_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      rate_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      multiplier: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "OvertimeRate",
      tableName: "overtime_rates",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      deletedAt: "deleted_at",
    }
  );

  return OvertimeRate;
};
