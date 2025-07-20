"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("employees", {
      employee_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      position_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "positions", key: "position_id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      department_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "departments", key: "department_id" },
        onUpdate: "CASCADE",
        onDelete: "RESTRICT",
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
      },
      role: {
        type: Sequelize.ENUM("HR", "Finance", "Employee"),
        allowNull: false,
      },
      employee_nik: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      full_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      dob: Sequelize.DATEONLY,
      gender: Sequelize.ENUM("W", "M"),
      address: Sequelize.TEXT,
      phone_number: Sequelize.STRING(15),
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      employment_status: Sequelize.ENUM(
        "Permanent",
        "Contract",
        "Probation",
        "Outsourced",
        "Intern",
        "Resigned"
      ),
      join_date: Sequelize.DATEONLY,
      resignation_date: Sequelize.DATEONLY,
      npwp_number: Sequelize.STRING(20),
      pt_kp: Sequelize.ENUM("TK0", "TK1", "TK2", "TK3", "K0", "K1", "K2", "K3"),
      bank_account_number: Sequelize.STRING(30),
      bank_name: Sequelize.STRING(50),
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      deleted_at: { type: Sequelize.DATE, allowNull: true },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("employees");
  },
};
