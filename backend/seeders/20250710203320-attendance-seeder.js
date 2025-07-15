"use strict";

const { Op } = require("sequelize");

const getWorkdays = (startDate, endDate) => {
  const dates = [];
  const current = new Date(startDate);
  while (current <= endDate) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) {
      dates.push(new Date(current));
    }
    current.setDate(current.getDate() + 1);
  }
  return dates;
};

const randomStatus = (dayIndex, employeeId) => {
  if ((employeeId === 1 && dayIndex === 5) || (employeeId === 2 && dayIndex === 10)) {
    return { status: "Sick", notes: "Flu" };
  }
  if (employeeId === 3 && dayIndex === 15) {
    return { status: "Leave", notes: "Urusan keluarga" };
  }
  return { status: "Present", notes: null };
};

const randomTime = (hourStart, minuteRange = 15) => {
  const hour = hourStart;
  const minute = Math.floor(Math.random() * (minuteRange + 1));
  const second = Math.floor(Math.random() * 60);
  return `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
};

module.exports = {
  async up(queryInterface) {
    const today = new Date();
    const attendances = [];

    const period1Start = new Date("2025-05-26");
    const period1End = new Date("2025-06-25");
    const dates1 = getWorkdays(period1Start, period1End);

    dates1.forEach((date, idx) => {
      [1, 2, 3].forEach((employeeId) => {
        const { status, notes } = randomStatus(idx, employeeId);
        const checkIn = randomTime(8);
        const checkOut = randomTime(17);
        attendances.push({
          employee_id: employeeId,
          attendance_date: date.toISOString().split("T")[0],
          check_in_time: checkIn,
          check_out_time: checkOut,
          status,
          notes,
          status_processed: "Processed",
        });
      });
    });

    const period2Start = new Date("2025-06-26");
    const period2End = today;
    const dates2 = getWorkdays(period2Start, period2End);

    dates2.forEach((date, idx) => {
      [1, 2, 3].forEach((employeeId) => {
        const { status, notes } = randomStatus(idx, employeeId);
        const checkIn = randomTime(8);
        const checkOut = randomTime(17);
        attendances.push({
          employee_id: employeeId,
          attendance_date: date.toISOString().split("T")[0],
          check_in_time: checkIn,
          check_out_time: checkOut,
          status,
          notes,
          status_processed: "Unprocessed",
        });
      });
    });

    await queryInterface.bulkInsert("attendances", attendances, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("attendances", {
      attendance_date: {
        [Op.between]: ["2025-05-26", new Date().toISOString().split("T")[0]],
      },
    });
    await queryInterface.sequelize.query('ALTER TABLE attendances AUTO_INCREMENT = 1');
  },
};
