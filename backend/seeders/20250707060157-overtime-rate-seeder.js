'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('overtime_rates', [

      {
        rate_type: 'Weekday - First Hour',
        multiplier: 1.5,
        description: '1st Hour (Monday–Saturday)'
      },
      {
        rate_type: 'Weekday - Second Hour Onwards',
        multiplier: 2.0,
        description: '2nd hour onwards (Monday–Saturday)'
      },

      {
        rate_type: 'Holiday - Hours 1 to 7',
        multiplier: 2.0,
        description: '1st to 7th hour (Holidays/Public Holidays)'
      },
      {
        rate_type: 'Holiday - Hour 8',
        multiplier: 3.0,
        description: '8th hour (Holidays/Public Holidays)'
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('overtime_rates', null, {});
    await queryInterface.sequelize.query('ALTER TABLE overtime_rates AUTO_INCREMENT = 1');

  }
};
