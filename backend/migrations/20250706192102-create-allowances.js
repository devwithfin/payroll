"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("allowances", {
      allowance_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      allowance_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      is_fixed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      default_amount: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: true,
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
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("allowances");
  },
};
