// migrations/xxxx-create-overtime-requests.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('overtime_requests', {
      request_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'employee_id'
        }
      },
      request_date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      overtime_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      start_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      end_time: {
        type: Sequelize.TIME,
        allowNull: false
      },
      reason: Sequelize.TEXT,
      submitted_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'employees',
          key: 'employee_id'
        }
      },
      approval_status: {
        type: Sequelize.STRING,
        defaultValue: 'Pending'
      },
      approved_by_hrd: {
        type: Sequelize.INTEGER,
        references: {
          model: 'employees',
          key: 'employee_id'
        },
        allowNull: true
      },
      approval_date_hrd: {
        type: Sequelize.DATE,
        allowNull: true
      },
      notes_approval: Sequelize.TEXT,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('overtime_requests');
  }
};
