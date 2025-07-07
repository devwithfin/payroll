'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('allowances', [
      {
        allowance_name: 'Tunjangan Transport',
        is_taxable: true,
        is_fixed: true
      },
      {
        allowance_name: 'Tunjangan Makan',
        is_taxable: true,
        is_fixed: true
      },
      {
        allowance_name: 'Tunjangan Komunikasi',
        is_taxable: true,
        is_fixed: true
      },
      {
        allowance_name: 'Tunjangan Jabatan',
        is_taxable: true,
        is_fixed: true
      },
      {
        allowance_name: 'Tunjangan Keahlian',
        is_taxable: true,
        is_fixed: false
      },
      {
        allowance_name: 'Tunjangan Keluarga',
        is_taxable: true,
        is_fixed: true
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('allowances', null, {});
  }
};
