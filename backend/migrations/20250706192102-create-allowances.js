'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('allowances', {
      allowance_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      allowance_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      is_taxable: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      is_fixed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('allowances');
  }
};
