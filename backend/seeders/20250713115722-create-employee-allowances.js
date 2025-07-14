'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const employees = await queryInterface.sequelize.query(
      `SELECT e.employee_id, e.position_id, p.job_allowance
       FROM employees e
       JOIN positions p ON e.position_id = p.position_id
       LIMIT 5;`
    );
    const employeeData = employees[0];

    const allowances = await queryInterface.sequelize.query(
      `SELECT * FROM allowances`
    );
    const allowanceData = allowances[0];

    // ⏱️ Periode sebelum payroll 5 Juli
    const effective_date = '2025-05-26';
    const end_date = '2025-06-25';

    const records = [];

    employeeData.forEach(emp => {
      allowanceData.forEach(alw => {
        // Prioritaskan default_amount jika ada, jika tidak ambil dari job_allowance
        const amount = alw.default_amount !== null ? alw.default_amount : emp.job_allowance;

        records.push({
          employee_id: emp.employee_id,
          allowance_id: alw.allowance_id,
          amount,
          effective_date,
          end_date,
          status_processed: 'Processed',  
          created_at: new Date(),
          updated_at: new Date(),
        });
      });
    });

    await queryInterface.bulkInsert('employee_allowances', records, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employee_allowances', null, {});
    await queryInterface.sequelize.query('ALTER TABLE employee_allowances AUTO_INCREMENT = 1');
  },
};
