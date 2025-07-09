'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [
      {
        username: 'hr_bayu',
        password: '$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW',
        role: 'HR',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'finance_dewi',
        password: '$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW',
        role: 'Finance',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        username: 'employee_fin',
        password: '$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW',
        role: 'Employee',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.sequelize.query('ALTER TABLE users AUTO_INCREMENT = 1');

  }
};
