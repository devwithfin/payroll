"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const overtimeRequests = [];
    const calculatedOvertimes = [];
    const now = new Date();

    const employeeIds = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const approved_by_hrd = 1;
    const notes_approval = "Disetujui oleh sistem";

    const getRandomDate = () => {
      const start = new Date("2025-06-26").getTime();
      const end = new Date("2025-07-25").getTime();
      const random = new Date(start + Math.random() * (end - start));
      return new Date(random).toISOString().split("T")[0];
    };

    // Step 1: Generate and insert overtime_requests
    for (const employee_id of employeeIds) {
      const jumlahLembur = Math.floor(Math.random() * 2) + 1;

      for (let i = 0; i < jumlahLembur; i++) {
        const overtime_date = getRandomDate();
        overtimeRequests.push({
          employee_id,
          request_date: now,
          overtime_date,
          start_time: "18:00:00",
          end_time: "20:00:00",
          reason: "Mengerjakan tugas tambahan",
          submitted_by: employee_id,
          approval_status: "Approved",
          approved_by_hrd,
          approval_date_hrd: now,
          notes_approval,
          created_at: now,
          updated_at: now,
        });
      }
    }

    await queryInterface.bulkInsert("overtime_requests", overtimeRequests);

    // Step 2: Ambil kembali data yang baru dimasukkan
    const insertedRequests = await queryInterface.sequelize.query(
      `SELECT * FROM overtime_requests ORDER BY request_id DESC LIMIT ${overtimeRequests.length}`,
      {
        type: Sequelize.QueryTypes.SELECT,
      }
    );

    // Step 3: Buat calculated_overtimes
    for (const req of insertedRequests) {
      if (!req.employee_id || !req.start_time || !req.end_time) continue;

      const [startHour, startMin] = req.start_time.split(":").map(Number);
      const [endHour, endMin] = req.end_time.split(":").map(Number);
      const duration = (endHour * 60 + endMin) - (startHour * 60 + startMin);

      const salaryResult = await queryInterface.sequelize.query(
        `
        SELECT p.base_salary FROM employees e
        JOIN positions p ON e.position_id = p.position_id
        WHERE e.employee_id = :employeeId
        LIMIT 1
        `,
        {
          replacements: { employeeId: req.employee_id },
          type: Sequelize.QueryTypes.SELECT,
        }
      );

      if (!salaryResult[0] || !salaryResult[0].base_salary) continue;

      const baseSalary = parseFloat(salaryResult[0].base_salary);
      const hourlyRate = baseSalary / 173;

      const day = new Date(req.overtime_date).getDay(); // 0 = Minggu, 6 = Sabtu
      let overtimeAmount = 0;

      if (day === 0 || day === 6) {
        // Weekend
        overtimeAmount =
          duration <= 60
            ? hourlyRate * 2.0
            : hourlyRate * 2.0 +
              Math.floor((duration - 60) / 60) * hourlyRate * 3.0;
      } else {
        // Weekday
        overtimeAmount =
          duration <= 60
            ? hourlyRate * 1.5
            : hourlyRate * 1.5 +
              Math.floor((duration - 60) / 60) * hourlyRate * 2.0;
      }

      calculatedOvertimes.push({
        request_id: req.request_id,
        employee_id: req.employee_id,
        overtime_date: req.overtime_date,
        start_time: req.start_time,
        end_time: req.end_time,
        duration_minutes: duration,
        overtime_amount: overtimeAmount,
        calculation_details: `Durasi: ${duration} menit, Tanggal: ${req.overtime_date}`,
        created_at: now,
        updated_at: now,
      });
    }

    // Step 4: Insert calculated_overtimes
    await queryInterface.bulkInsert("calculated_overtimes", calculatedOvertimes);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("calculated_overtimes", null, {});
    await queryInterface.bulkDelete("overtime_requests", null, {});
  },
};
