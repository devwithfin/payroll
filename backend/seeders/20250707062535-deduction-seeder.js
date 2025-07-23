'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('deductions', [
      {
        deduction_name: 'Pinjaman Karyawan',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('deductions', null, {});
    await queryInterface.sequelize.query('ALTER TABLE deductions AUTO_INCREMENT = 1');

  }
};

