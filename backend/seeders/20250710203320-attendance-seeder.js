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
    return { status: "Sick", notes: "Flue" };
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
    const start = new Date("2025-05-26");
    const end = new Date("2025-06-25");
    const dates = getWorkdays(start, end);
    const attendances = [];

    dates.forEach((date, idx) => {
      [1, 2, 3].forEach((employeeId) => {
        const { status, notes } = randomStatus(idx, employeeId);
        const checkIn = randomTime(8, 15);  
        const checkOut = randomTime(17, 15);  
        attendances.push({
          employee_id: employeeId,
          attendance_date: date.toISOString().split("T")[0],
          check_in_time: checkIn,
          check_out_time: checkOut,
          status,
          notes,
          status_processed: "Processed"
        });
      });
    });

    await queryInterface.bulkInsert("attendances", attendances, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("attendances", {
      attendance_date: {
        [Op.between]: ["2024-05-26", "2024-06-25"],
      },
    });
    await queryInterface.bulkDelete("attendances", null, {});
    await queryInterface.sequelize.query('ALTER TABLE attendances AUTO_INCREMENT = 1');
  },
};
