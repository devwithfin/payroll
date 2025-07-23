'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('departments', [
      { department_name: 'Engineering', created_at: new Date(), updated_at: new Date() },
      { department_name: 'IT Infrastructure', created_at: new Date(), updated_at: new Date() },
      { department_name: 'Product', created_at: new Date(), updated_at: new Date() },
      { department_name: 'Design', created_at: new Date(), updated_at: new Date() },
      { department_name: 'Human Resources', created_at: new Date(), updated_at: new Date() },
      { department_name: 'Finance', created_at: new Date(), updated_at: new Date() },
      { department_name: 'Customer Support', created_at: new Date(), updated_at: new Date() },
      { department_name: 'Marketing', created_at: new Date(), updated_at: new Date() },
      { department_name: 'Sales', created_at: new Date(), updated_at: new Date() },
      { department_name: 'Operations', created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('departments', null, {});
    await queryInterface.sequelize.query('ALTER TABLE departments AUTO_INCREMENT = 1');

  }
};
