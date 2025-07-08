"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "tax_bpjs_config",
      [
        {
          config_name: "Config 2025",
          pph21_rules: JSON.stringify({
            PTKP: {
              TK0: 54000000,
              TK1: 58500000,
              TK2: 63000000,
              TK3: 67500000,
              K0: 58500000,
              K1: 63000000,
              K2: 67500000,
              K3: 72000000,
            },
            PKP: [
              { min: 0, max: 60000000, rate: 0.05 },
              { min: 60000000, max: 250000000, rate: 0.15 },
              { min: 250000000, max: 500000000, rate: 0.25 },
              { min: 500000000, max: 5000000000, rate: 0.3 },
              { min: 5000000000, max: null, rate: 0.35 },
            ],
          }),
          bpjs_kesehatan_employee_rate: 0.01,
          bpjs_kesehatan_company_rate: 0.04,
          bpjs_tk_jkm_employee_rate: 0.0,
          bpjs_tk_jkm_company_rate: 0.003,
          bpjs_tk_jht_employee_rate: 0.02,
          bpjs_tk_jht_company_rate: 0.037,
          bpjs_tk_jp_employee_rate: 0.01,
          bpjs_tk_jp_company_rate: 0.02,
          bpjs_tk_jkk_company_rate: 0.0089,
          effective_start_date: new Date("2025-01-01"),
          effective_end_date: new Date("2025-12-31"),
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("tax_bpjs_config", null, {});
    await queryInterface.sequelize.query('ALTER TABLE tax_bpjs_config AUTO_INCREMENT = 1');
  },
};
