const {
  Attendance,
  OvertimeRequest,
  PayrollDetail,
  PayrollPeriod,
} = require("../models");
const { Op } = require("sequelize");

module.exports = {
  getSummaryData: async (req, res) => {
    try {
      const employeeId = req.params.id;

      let period = await PayrollPeriod.findOne({
        where: { status: "Closed" },
        order: [["end_date", "DESC"]],
      });

      if (!period) {
        period = await PayrollPeriod.findOne({
          order: [["end_date", "DESC"]],
        });
      }

      if (!period) {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(endDate.getMonth() - 1);

        return res.status(200).json({
          period: {
            name: "Periode Sementara",
            start_date: startDate.toISOString().split("T")[0],
            end_date: endDate.toISOString().split("T")[0],
          },
          summary: {
            total_attendance: 0,
            total_overtime_hours: 0,
            last_salary_received: 0,
          },
          attendance_summary: {
            Present: 0,
            Sick: 0,
            Leave: 0,
            Absent: 0,
          },
          attendance_chart: [],
          overtime_chart: [],
          salary_chart: [],
        });
      }

      const { start_date, end_date, period_name } = period;

      const attendanceRaw = await Attendance.findAll({
        where: {
          employee_id: employeeId,
          attendance_date: { [Op.between]: [start_date, end_date] },
        },
        attributes: ["attendance_date", "status", "check_in_time", "check_out_time"],
        order: [["attendance_date", "ASC"]],
      });

      const attendanceChart = attendanceRaw.map((a) => ({
        date: a.attendance_date,
        status: a.status,
        check_in_time: a.check_in_time,
        check_out_time: a.check_out_time,
      }));

      const attendanceSummary = {};
      for (const a of attendanceRaw) {
        const s = a.status;
        attendanceSummary[s] = (attendanceSummary[s] || 0) + 1;
      }

      const allStatuses = ["Present", "Sick", "Leave", "Absent"];
      for (const status of allStatuses) {
        if (!attendanceSummary[status]) attendanceSummary[status] = 0;
      }

      const totalAttendance = attendanceSummary["Present"] || 0;
      const overtimeRecords = await OvertimeRequest.findAll({
        where: {
          employee_id: employeeId,
          approval_status: "Approved",
          overtime_date: { [Op.between]: [start_date, end_date] },
        },
      });

      const parseTimeToMinutes = (timeStr) => {
        if (!timeStr) return 0;
        const [hh, mm, ss] = timeStr.split(":").map(Number);
        return hh * 60 + mm + (ss || 0) / 60;
      };

      const overtimeChart = overtimeRecords.map((ot) => {
        const startMins = parseTimeToMinutes(ot.start_time);
        const endMins = parseTimeToMinutes(ot.end_time);
        const durationMins = endMins - startMins;
        const hours = durationMins > 0 ? parseFloat((durationMins / 60).toFixed(2)) : 0;

        return {
          date: ot.overtime_date,
          hours,
        };
      });

      const totalOvertimeHours = overtimeChart.reduce(
        (sum, o) => sum + (o.hours || 0),
        0
      );


      const lastSalary = await PayrollDetail.findOne({
        where: {
          employee_id: employeeId,
          payroll_status: "Final",
        },
        order: [["payment_date", "DESC"]],
      });
      const salaryHistory = await PayrollDetail.findAll({
        where: {
          employee_id: employeeId,
          payroll_status: "Final",
        },
        include: {
          model: PayrollPeriod,
          as: "period",
          attributes: ["period_name"],
        },
        order: [["payment_date", "DESC"]],
        limit: 3,
      });

      const salaryChart = salaryHistory
        .filter((s) => s.period)
        .map((s) => ({
          period: s.period.period_name,
          net_salary: parseFloat(s.net_salary),
        }))
        .reverse();

      return res.status(200).json({
        period: {
          name: period_name,
          start_date,
          end_date,
        },
        summary: {
          total_attendance: totalAttendance,
          total_overtime_hours: parseFloat(totalOvertimeHours.toFixed(2)),
          last_salary_received: parseFloat(lastSalary?.net_salary || 0),
        },
        attendance_summary: attendanceSummary,
        attendance_chart: attendanceChart,
        overtime_chart: overtimeChart,
        salary_chart: salaryChart,
      });
    } catch (error) {
      console.error("Error fetching dashboard summary:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
