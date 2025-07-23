'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const periods = [];
    const start = new Date('2025-05-26');

    for (let i = 0; i < 2; i++) {
      const startDate = new Date(start);
      startDate.setMonth(start.getMonth() + i);

      const endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(endDate.getDate() - 1);

      const payrollDate = new Date(endDate);
      payrollDate.setDate(payrollDate.getDate() + 10); 

      const periodMid = new Date(startDate);
      periodMid.setDate(periodMid.getDate() + 15);

      const periodName = periodMid.toLocaleDateString('id-ID', {
        month: 'long',
        year: 'numeric',
      });

      const status = i === 0 ? 'Closed' : 'Open';

      periods.push({
        period_name: periodName,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        payroll_date: payrollDate.toISOString().split('T')[0],
        status,
      });
    }

    await queryInterface.bulkInsert('payroll_periods', periods, {});
  },

  async down(queryInterface, Sequelize) {
   await queryInterface.bulkDelete("users", null, {});
  await queryInterface.bulkDelete("employee_deductions", null, {});
  await queryInterface.bulkDelete("employee_allowances", null, {});
  await queryInterface.bulkDelete("calculated_overtimes", null, {});
  await queryInterface.bulkDelete("overtime_requests", null, {});
  await queryInterface.bulkDelete("attendances", null, {});
  await queryInterface.bulkDelete("payroll_details", null, {});

  await queryInterface.bulkDelete("employees", null, {});
  await queryInterface.bulkDelete("positions", null, {});
  await queryInterface.bulkDelete("departments", null, {});
  await queryInterface.bulkDelete("payroll_periods", null, {});
    await queryInterface.sequelize.query('ALTER TABLE payroll_periods AUTO_INCREMENT = 1');
    
  },
};
