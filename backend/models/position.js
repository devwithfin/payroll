// model/position
"use strict";

module.exports = (sequelize, DataTypes) => {
  const Position = sequelize.define(
    "Position",
    {
      position_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      position_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      base_salary: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
      },
      job_allowance: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: true,
        defaultValue: 0.0,
      },
    },
    {
      sequelize,
      modelName: "Positions",
      tableName: "positions",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      paranoid: true,
      deletedAt: "deleted_at",
    }
  );

  Position.associate = (models) => {
    Position.belongsTo(models.Department, {
      foreignKey: "department_id",
      as: "department",
    });
  };

  return Position;
};
