"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "allowances",
      [
        {
          allowance_name: "Tunjangan Makan",
          is_fixed: true,
          default_amount: 1000000,
        },
        {
          allowance_name: "Tunjangan Transport",
          is_fixed: true,
          default_amount: 1000000,
        },
        {
          allowance_name: "Tunjangan Jabatan",
          is_fixed: true,
          default_amount: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("allowances", null, {});
    await queryInterface.sequelize.query(
      "ALTER TABLE allowances AUTO_INCREMENT = 1"
    );
  },
};
