'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('deductions', [
      {
        deduction_name: 'Potongan Keterlambatan',
        is_recurring: false
      },
      {
        deduction_name: 'Potongan Kasbon',
        is_recurring: true
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('deductions', null, {});
  }
};
