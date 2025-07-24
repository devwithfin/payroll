"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const [employees] = await queryInterface.sequelize.query(`
      SELECT e.employee_id, e.position_id, p.job_allowance
      FROM employees e
      JOIN positions p ON e.position_id = p.position_id

    `);

    const [allowances] = await queryInterface.sequelize.query(`
      SELECT allowance_id, default_amount FROM allowances;
    `);

    if (!employees.length || !allowances.length) return;

    const effective_date = "2025-06-26";
    const end_date = "2025-07-25";
    const now = new Date();

    const records = [];

    for (const emp of employees) {
      for (const alw of allowances) {
        const amount =
          alw.default_amount !== null
            ? alw.default_amount
            : emp.job_allowance || 0;

        records.push({
          employee_id: emp.employee_id,
          allowance_id: alw.allowance_id,
          amount,
          effective_date,
          end_date,
          created_at: now,
          updated_at: now,
        });
      }
    }

    if (records.length) {
      await queryInterface.bulkInsert("employee_allowances", records, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("employee_allowances", null, {});
    await queryInterface.sequelize.query(`
      ALTER TABLE employee_allowances AUTO_INCREMENT = 1;
    `);
  },
};
