'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('deductions', {
      deduction_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      deduction_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      is_recurring: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('deductions');
  }
};
