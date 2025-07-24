"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        email: "bayuanggara@gmail.com",
        password:
          "$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW",
        role: "HR",
        employee_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "puspitadewi@gmail.com",
        password:
          "$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW",
        role: "Finance",
        employee_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "alfiansyahcahyow@gmail.com",
        password:
          "$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW",
        role: "Employee",
        employee_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "nadya.pratiwi@gmail.com",
        password:
          "$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW",
        role: "Employee",
        employee_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "rio.darmawan@gmail.com",
        password:
          "$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW",
        role: "Employee",
        employee_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "agus.purnomo@gmail.com",
        password:
          "$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW",
        role: "Employee",
        employee_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "ratna.sari@gmail.com",
        password:
          "$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW",
        role: "Employee",
        employee_id: 7,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "satria.yudha@gmail.com",
        password:
          "$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW",
        role: "Employee",
        employee_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "yuni.kartika@gmail.com",
        password:
          "$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW",
        role: "Employee",
        employee_id: 9,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "deni.prakoso@gmail.com",
        password:
          "$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW",
        role: "Employee",
        employee_id: 10,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "wulan.fitriani@gmail.com",
        password:
          "$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW",
        role: "Employee",
        employee_id: 11,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "andika.saputra@gmail.com",
        password:
          "$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW",
        role: "Employee",
        employee_id: 12,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "siska.rahma@gmail.com",
        password:
          "$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW",
        role: "Employee",
        employee_id: 13,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "fajar.hidayat@gmail.com",
        password:
          "$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW",
        role: "Employee",
        employee_id: 14,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "rino.hartono@gmail.com",
        password:
          "$2b$10$bKgw9Q4RG.HaPk5Aj.XlPuFBbPT8/prBGDX6W7siH80SSO06xz4yW",
        role: "Employee",
        employee_id: 15,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.sequelize.query(
      "ALTER TABLE users AUTO_INCREMENT = 1"
    );
  },
};
