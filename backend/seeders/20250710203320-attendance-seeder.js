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

const randomStatus = () => {
  const rand = Math.random();
  if (rand < 0.75) return { status: "Present", notes: null };
  if (rand < 0.85) return { status: "Sick", notes: "Sakit kepala" };
  if (rand < 0.95) return { status: "Leave", notes: "Izin pribadi" };
  return { status: "Absent", notes: "Tanpa keterangan" };
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
    const attendances = [];

    const periodStart = new Date("2025-06-26");
    const today = new Date();
    const periodEnd = new Date(today);
    periodEnd.setDate(today.getDate() - 1);

    const workdays = getWorkdays(periodStart, periodEnd);

    workdays.forEach((date) => {
      for (let employeeId = 1; employeeId <= 15; employeeId++) {
        const { status, notes } = randomStatus();
        const checkIn = randomTime(8);
        const checkOut = randomTime(17);
        attendances.push({
          employee_id: employeeId,
          attendance_date: date.toISOString().split("T")[0],
          check_in_time: checkIn,
          check_out_time: checkOut,
          status,
          notes,
        });
      }
    });

    await queryInterface.bulkInsert("attendances", attendances, {});
  },

  async down(queryInterface) {
    const startDate = "2025-06-26";
    const today = new Date();
    const endDate = new Date(today);
    endDate.setDate(today.getDate() - 1);
    const endDateString = endDate.toISOString().split("T")[0];

    await queryInterface.bulkDelete("attendances", {
      attendance_date: {
        [Op.between]: [startDate, endDateString],
      },
    });
    await queryInterface.sequelize.query("ALTER TABLE attendances AUTO_INCREMENT = 1");
  },
};
