"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        email: "bayuanggara@gmail.com",  
        password: "$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW",
        role: "HR",
        employee_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "dewipustis@gmail.com",
        password: "$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW",
        role: "Finance",
        employee_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "alfiansyahcahyow@gmail.com",
        password: "$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW",
        role: "Employee",
        employee_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.sequelize.query('ALTER TABLE users AUTO_INCREMENT = 1');
  },
};
