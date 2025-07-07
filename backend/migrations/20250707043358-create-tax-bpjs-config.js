'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tax_bpjs_config', {
      config_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      config_name: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false
      },
      pph21_rules: {
        type: Sequelize.JSON,
        allowNull: false
      },
      bpjs_kesehatan_employee_rate: {
        type: Sequelize.DECIMAL(5,4),
        allowNull: false
      },
      bpjs_kesehatan_company_rate: {
        type: Sequelize.DECIMAL(5,4),
        allowNull: false
      },
      bpjs_tk_jkm_employee_rate: {
        type: Sequelize.DECIMAL(5,4),
        allowNull: false
      },
      bpjs_tk_jkm_company_rate: {
        type: Sequelize.DECIMAL(5,4),
        allowNull: false
      },
      bpjs_tk_jht_employee_rate: {
        type: Sequelize.DECIMAL(5,4),
        allowNull: false
      },
      bpjs_tk_jht_company_rate: {
        type: Sequelize.DECIMAL(5,4),
        allowNull: false
      },
      bpjs_tk_jp_employee_rate: {
        type: Sequelize.DECIMAL(5,4),
        allowNull: false
      },
      bpjs_tk_jp_company_rate: {
        type: Sequelize.DECIMAL(5,4),
        allowNull: false
      },
      bpjs_tk_jkk_company_rate: {
        type: Sequelize.DECIMAL(5,4),
        allowNull: false
      },
      effective_start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      effective_end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
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
    await queryInterface.dropTable('tax_bpjs_config');
  }
};
