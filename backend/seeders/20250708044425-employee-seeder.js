"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("employees", [
      {
        employee_id: 1,
        position_id: 8,
        department_id: 5,
        role: "HR",
        employee_nik: "1234567890",
        full_name: "Bayu Anggara",
        dob: "1990-01-01",
        gender: "M",
        address: "Jl. Raya Pajajaran No. 78,",
        phone_number: "081234567890",
        email: "bayuanggara@gmail.com",
        employment_status: "Permanent",
        join_date: "2020-01-01",
        resignation_date: null,
        npwp_number: "12.345.678.9-012.000",
        pt_kp: "K2",
        bank_account_number: "123456789",
        bank_name: "Bank Central Asia",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        employee_id: 2,
        position_id: 10,
        department_id: 6,
        role: "Finance",
        employee_nik: "2234567890",
        full_name: "Dewi Puspita",
        dob: "1992-02-02",
        gender: "W",
        address: "Jl. Ahmad Yani No. 27,",
        phone_number: "081234567891",
        email: "dewipustis@gmail.com",
        employment_status: "Permanent",
        join_date: "2020-02-02",
        resignation_date: null,
        npwp_number: "98.765.432.1-001.000",
        pt_kp: "K1",
        bank_account_number: "987654321",
        bank_name: "Bank Mandiri",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        employee_id: 3,
        position_id: 1,
        department_id: 1,
        role: "Employee",
        employee_nik: "3302020991",
        full_name: "Alfiansyah Wicaksono",
        dob: "2004-12-09",
        gender: "M",
        address: "Jl. Raya Bogor KM 38",
        phone_number: "085819727856",
        email: "alfiansyahcahyow@gmail.com",
        employment_status: "Permanent",
        join_date: "2024-09-02",
        resignation_date: null,
        npwp_number: "45.852.123.0-009.000",
        pt_kp: "TK0",
        bank_account_number: "18009346",
        bank_name: "Bank Mandiri",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('overtime_requests', null, {});
    await queryInterface.bulkDelete("employees", null, {});
     await queryInterface.sequelize.query('ALTER TABLE employees AUTO_INCREMENT = 1');

  },
};
