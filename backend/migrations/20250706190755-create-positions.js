"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("positions", {
      position_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "departments",
          key: "department_id",
        },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      position_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      base_salary: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
      },
      job_allowance: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("positions");
  },
};
