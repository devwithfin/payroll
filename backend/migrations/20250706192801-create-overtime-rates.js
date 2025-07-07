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
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('overtime_rates');
  }
};
