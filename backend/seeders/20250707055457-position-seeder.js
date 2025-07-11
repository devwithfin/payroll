'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('positions', [
      { position_name: 'Software Engineer', base_salary: 10000000, job_allowance: 500000, created_at: new Date(), updated_at: new Date() },
      { position_name: 'Frontend Developer', base_salary: 9000000, job_allowance: 400000, created_at: new Date(), updated_at: new Date() },
      { position_name: 'Backend Developer', base_salary: 9000000, job_allowance: 400000, created_at: new Date(), updated_at: new Date() },
      { position_name: 'DevOps Engineer', base_salary: 11000000, job_allowance: 600000, created_at: new Date(), updated_at: new Date() },
      { position_name: 'QA Engineer', base_salary: 8500000, job_allowance: 400000, created_at: new Date(), updated_at: new Date() },
      { position_name: 'Product Manager', base_salary: 13000000, job_allowance: 1000000, created_at: new Date(), updated_at: new Date() },
      { position_name: 'UI/UX Designer', base_salary: 8000000, job_allowance: 350000, created_at: new Date(), updated_at: new Date() },
      { position_name: 'HR Generalist', base_salary: 7000000, job_allowance: 300000, created_at: new Date(), updated_at: new Date() },
      { position_name: 'Finance Analyst', base_salary: 8000000, job_allowance: 300000, created_at: new Date(), updated_at: new Date() },
      { position_name: 'IT Support', base_salary: 6000000, job_allowance: 250000, created_at: new Date(), updated_at: new Date() },
      { position_name: 'Customer Support Specialist', base_salary: 5500000, job_allowance: 200000, created_at: new Date(), updated_at: new Date() },
      { position_name: 'Marketing Specialist', base_salary: 6500000, job_allowance: 300000, created_at: new Date(), updated_at: new Date() },
      { position_name: 'Sales Executive', base_salary: 7500000, job_allowance: 400000, created_at: new Date(), updated_at: new Date() },
      { position_name: 'Office Manager', base_salary: 6500000, job_allowance: 350000, created_at: new Date(), updated_at: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('positions', null, {});
    await queryInterface.sequelize.query('ALTER TABLE positions AUTO_INCREMENT = 1');
  }
};
