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
        email: "puspitadewi@gmail.com",
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
      {
        employee_id: 4,
        position_id: 1,
        department_id: 1,
        role: "Employee",
        employee_nik: "4000000001",
        full_name: "Nadya Pratiwi",
        dob: "1996-05-12",
        gender: "W",
        address: "Jl. Mawar No. 15",
        phone_number: "081234500001",
        email: "nadya.pratiwi@gmail.com",
        employment_status: "Contract",
        join_date: "2022-01-15",
        resignation_date: null,
        npwp_number: "11.111.111.1-111.000",
        pt_kp: "K1",
        bank_account_number: "987650001",
        bank_name: "Bank BRI",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        employee_id: 5,
        position_id: 2,
        department_id: 1,
        role: "Employee",
        employee_nik: "4000000002",
        full_name: "Rio Darmawan",
        dob: "1995-11-20",
        gender: "M",
        address: "Jl. Kenanga No. 10",
        phone_number: "081234500002",
        email: "rio.darmawan@gmail.com",
        employment_status: "Permanent",
        join_date: "2021-03-01",
        resignation_date: null,
        npwp_number: "22.222.222.2-222.000",
        pt_kp: "K0",
        bank_account_number: "987650002",
        bank_name: "Bank BNI",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        employee_id: 6,
        position_id: 3,
        department_id: 2,
        role: "Employee",
        employee_nik: "4000000003",
        full_name: "Agus Purnomo",
        dob: "1990-07-15",
        gender: "M",
        address: "Jl. Melati No. 12",
        phone_number: "081234500003",
        email: "agus.purnomo@gmail.com",
        employment_status: "Intern",
        join_date: "2024-06-01",
        resignation_date: null,
        npwp_number: "33.333.333.3-333.000",
        pt_kp: "K2",
        bank_account_number: "987650003",
        bank_name: "Bank Mandiri",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        employee_id: 7,
        position_id: 4,
        department_id: 2,
        role: "Employee",
        employee_nik: "4000000004",
        full_name: "Ratna Sari",
        dob: "1993-09-25",
        gender: "W",
        address: "Jl. Anggrek No. 5",
        phone_number: "081234500004",
        email: "ratna.sari@gmail.com",
        employment_status: "Permanent",
        join_date: "2023-02-01",
        resignation_date: null,
        npwp_number: "44.444.444.4-444.000",
        pt_kp: "TK0",
        bank_account_number: "987650004",
        bank_name: "Bank BCA",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        employee_id: 8,
        position_id: 5,
        department_id: 3,
        role: "Employee",
        employee_nik: "4000000005",
        full_name: "Satria Yudha",
        dob: "1988-03-30",
        gender: "M",
        address: "Jl. Teratai No. 20",
        phone_number: "081234500005",
        email: "satria.yudha@gmail.com",
        employment_status: "Contract",
        join_date: "2019-09-10",
        resignation_date: null,
        npwp_number: "55.555.555.5-555.000",
        pt_kp: "K3",
        bank_account_number: "987650005",
        bank_name: "Bank BTN",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        employee_id: 9,
        position_id: 6,
        department_id: 4,
        role: "Employee",
        employee_nik: "4000000006",
        full_name: "Yuni Kartika",
        dob: "1997-08-08",
        gender: "W",
        address: "Jl. Flamboyan No. 2",
        phone_number: "081234500006",
        email: "yuni.kartika@gmail.com",
        employment_status: "Intern",
        join_date: "2025-06-10",
        resignation_date: null,
        npwp_number: "66.666.666.6-666.000",
        pt_kp: "K0",
        bank_account_number: "987650006",
        bank_name: "Bank BSI",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        employee_id: 10,
        position_id: 7,
        department_id: 4,
        role: "Employee",
        employee_nik: "4000000007",
        full_name: "Deni Prakoso",
        dob: "1994-10-10",
        gender: "M",
        address: "Jl. Cempaka No. 18",
        phone_number: "081234500007",
        email: "deni.prakoso@gmail.com",
        employment_status: "Contract",
        join_date: "2021-05-05",
        resignation_date: null,
        npwp_number: "77.777.777.7-777.000",
        pt_kp: "TK0",
        bank_account_number: "987650007",
        bank_name: "Bank Danamon",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        employee_id: 11,
        position_id: 11,
        department_id: 7,
        role: "Employee",
        employee_nik: "4000000008",
        full_name: "Wulan Fitriani",
        dob: "1992-06-18",
        gender: "W",
        address: "Jl. Dahlia No. 3",
        phone_number: "081234500008",
        email: "wulan.fitriani@gmail.com",
        employment_status: "Permanent",
        join_date: "2021-08-20",
        resignation_date: null,
        npwp_number: "88.888.888.8-888.000",
        pt_kp: "K1",
        bank_account_number: "987650008",
        bank_name: "Bank BJB",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        employee_id: 12,
        position_id: 12,
        department_id: 8,
        role: "Employee",
        employee_nik: "4000000009",
        full_name: "Andika Saputra",
        dob: "1991-04-12",
        gender: "M",
        address: "Jl. Merpati No. 1",
        phone_number: "081234500009",
        email: "andika.saputra@gmail.com",
        employment_status: "Intern",
        join_date: "2025-06-01",
        resignation_date: null,
        npwp_number: "99.999.999.9-999.000",
        pt_kp: "TK0",
        bank_account_number: "987650009",
        bank_name: "Bank BTPN",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        employee_id: 13,
        position_id: 13,
        department_id: 9,
        role: "Employee",
        employee_nik: "4000000010",
        full_name: "Siska Rahma",
        dob: "1998-12-01",
        gender: "W",
        address: "Jl. Garuda No. 17",
        phone_number: "081234500010",
        email: "siska.rahma@gmail.com",
        employment_status: "Permanent",
        join_date: "2023-03-01",
        resignation_date: null,
        npwp_number: "10.101.010.0-010.000",
        pt_kp: "K2",
        bank_account_number: "987650010",
        bank_name: "Bank Panin",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        employee_id: 14,
        position_id: 14,
        department_id: 10,
        role: "Employee",
        employee_nik: "4000000011",
        full_name: "Fajar Hidayat",
        dob: "1990-01-01",
        gender: "M",
        address: "Jl. Cendrawasih No. 9",
        phone_number: "081234500011",
        email: "fajar.hidayat@gmail.com",
        employment_status: "Contract",
        join_date: "2022-11-11",
        resignation_date: null,
        npwp_number: "12.121.212.1-212.000",
        pt_kp: "K1",
        bank_account_number: "987650011",
        bank_name: "Bank CIMB Niaga",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        employee_id: 15,
        position_id: 11,
        department_id: 7,
        role: "Employee",
        employee_nik: "4000000012",
        full_name: "Rino Hartono",
        dob: "1992-01-20",
        gender: "M",
        address: "Jl. Rajawali No. 5",
        phone_number: "081234500012",
        email: "rino.hartono@gmail.com",
        employment_status: "Intern",
        join_date: "2025-07-01",
        resignation_date: null,
        npwp_number: "99.111.222.0-012.000",
        pt_kp: "TK0",
        bank_account_number: "987650012",
        bank_name: "Bank Muamalat",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("overtime_requests", null, {});
    await queryInterface.bulkDelete("employees", null, {});
    await queryInterface.sequelize.query(
      "ALTER TABLE employees AUTO_INCREMENT = 1"
    );
  },
};
