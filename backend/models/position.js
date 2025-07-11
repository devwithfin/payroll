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
        defaultValue: 0.00,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      tableName: "positions",
      underscored: true,
      paranoid: true, // untuk soft delete
      timestamps: true, // aktifkan otomatis createdAt & updatedAt
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  // Relasi ke Department
  Position.associate = function (models) {
    Position.belongsTo(models.Department, {
      foreignKey: "department_id",
      as: "department",
    });
  };

  return Position;
};
