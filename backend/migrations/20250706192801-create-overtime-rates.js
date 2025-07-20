'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('overtime_rates', {
      rate_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      rate_type: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      multiplier: {
        type: Sequelize.DECIMAL(5, 2),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('overtime_rates');
  }
};
