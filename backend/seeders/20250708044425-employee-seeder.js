'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('employees', [
      {
        employee_id: 1,
        id_user: 1,
        position_id : 8,
        department_id : 5,
        employee_nik : "6602020705980002",
        full_name : "Bayu Anggara", 
        dob : "1998/05/07",
        gender : "M", 
        address : "Jl. Klender No.31",
        phone_number : "089765437123",
        email : "bayuanggara@gmail.com",
        employment_status : "Permanent", 
        join_date : "2020/03/04",
        resignation_date : null,
        npwp_number : "12.345.678.9-012.000",
        pt_kp : "K2",
        bank_account_number : "5810293745",
        "bank_name" : "BCA"
      },
      {
        employee_id: 2,
        id_user: 2,
        position_id : 2,
        department_id : 2,
        employee_nik : "3302020912040002",
        full_name : "Alfiansyah Cahyo Wicaksono",
        dob : "2004/12/09",
        gender : "M", 
        address : "Jl. Raya Bogor",
        phone_number : "085819727856",
        email : "alfiansyahcahyow@gmail.com",
        employment_status : "Permanent", 
        join_date : "2022/07/12",
        resignation_date : null, 
        npwp_number : "09.876.543.2-001.000",
        pt_kp : "TK0",
        bank_account_number : "3201948372",
        bank_name : "BCA"
      },
      {
        employee_id: 3,
        id_user: 3,
        position_id : 9,
        department_id : 6,
        employee_nik : "3204131012030008",
        full_name : "Dewi Puspita Sari",
        dob : "2003/02/01",
        gender : "W", 
        address : "Jl. Pekapuran",
        phone_number : "087634129866",
        email : "dewipustis@gmail.com",
        employment_status : "Permanent", 
        join_date : "2021/01/05",
        resignation_date : null, 
        npwp_number : "03.182.746.1-023.000",
        pt_kp : "K1",
        bank_account_number : "3748291058",
        bank_name : "BCA"
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('employees', null, {});
     await queryInterface.sequelize.query('ALTER TABLE employees AUTO_INCREMENT = 1');

  }
};
