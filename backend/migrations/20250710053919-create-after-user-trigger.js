"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE TRIGGER after_user_created
      AFTER INSERT ON users
      FOR EACH ROW
      BEGIN
        UPDATE employees
        SET id_user = NEW.id_user
        WHERE email = NEW.email;
      END
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS after_user_created;
    `);
  },
};
