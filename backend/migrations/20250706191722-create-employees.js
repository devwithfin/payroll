'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      employee_nik: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      full_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      dob: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM('W', 'M'),
        allowNull: false
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      phone_number: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      employment_status: {
        type: Sequelize.ENUM('Permanent', 'Contract', 'Probation', 'Outsourced', 'Intern', 'Resigned'),
        allowNull: false
      },
      join_date: {
        type: Sequelize.DATEONLY
      },
      resignation_date: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      npwp_number: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      pt_kp: {
        type: Sequelize.ENUM('TK0','TK1','TK2','TK3','K0','K1','K2','K3'),
        allowNull: false
      },
      bank_account_number: {
        type: Sequelize.STRING(30),
        allowNull: false
      },
      bank_name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      position_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'positions',
          key: 'position_id'
        }
      },
      departement_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'departements',
          key: 'department_id'
        }
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
    await queryInterface.dropTable('employees');
  }
};
