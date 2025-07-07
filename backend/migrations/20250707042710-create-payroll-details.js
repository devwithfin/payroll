'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payroll_details', {
      payroll_detail_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      period_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'payroll_periods',
          key: 'period_id'
        }
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'employee_id'
        }
      },
      total_working_days: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      total_attendance_days: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      base_salary: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      total_allowances: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      total_overtime_pay: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      gross_salary: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      pph21_deduction: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      bpjs_kesehatan_deduction: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      bpjs_ketenagakerjaan_deduction: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      other_deductions: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      total_deductions: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      net_salary: {
        type: Sequelize.DECIMAL(15, 2),
        allowNull: false
      },
      payroll_status: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      payment_date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable('payroll_details');
  }
};
