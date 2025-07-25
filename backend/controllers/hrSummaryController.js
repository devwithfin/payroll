// controller/hr-summary
const {
  Employee,
  Department,
  Position,
  Attendance,
  OvertimeRequest,
  PayrollPeriod,
} = require("../models");

const { Op } = require("sequelize");

module.exports = {
  getSummaryData: async (req, res) => {
    try {
      const periods = await PayrollPeriod.findAll({
        order: [["start_date", "DESC"]],
        limit: 3,
      });

      const attendanceBarChart = [];

      for (const period of periods) {
        const { period_name, start_date, end_date } = period;

        const records = await Attendance.findAll({
          where: {
            attendance_date: {
              [Op.between]: [start_date, end_date],
            },
          },
          attributes: ["status"],
          raw: true,
        });

        const counts = {
          period: period_name,
          Present: 0,
          Sick: 0,
          Leave: 0,
          Absent: 0,
        };

        for (const rec of records) {
          const s = rec.status;
          if (counts[s] !== undefined) counts[s]++;
        }

        attendanceBarChart.push(counts);
      }

      let currentPeriod = periods[0];
      const startDate = currentPeriod?.start_date;
      const endDate = currentPeriod?.end_date;

      const [
        totalEmployees,
        totalDepartments,
        totalPositions,
        totalPendingOvertime,
      ] = await Promise.all([
        Employee.count(),
        Department.count(),
        Position.count(),
        OvertimeRequest.count({ where: { approval_status: "Pending" } }),
      ]);

      const employmentStatuses = [
        "Permanent",
        "Contract",
        "Intern",
        "Probation",
        "Outsourced",
        "Resigned",
      ];
      const statusCounts = {};
      for (const status of employmentStatuses) {
        const count = await Employee.count({
          where: { employment_status: status },
        });
        statusCounts[status] = count;
      }

      const attendanceRaw = await Attendance.findAll({
        where: {
          attendance_date: {
            [Op.between]: [startDate, endDate],
          },
        },
        attributes: [
          "attendance_date",
          "status",
          "check_in_time",
          "check_out_time",
        ],
        order: [["attendance_date", "ASC"]],
      });

      const attendanceSummary = {};
      const allStatuses = ["Present", "Sick", "Leave", "Absent"];
      for (const a of attendanceRaw) {
        const s = a.status;
        attendanceSummary[s] = (attendanceSummary[s] || 0) + 1;
      }
      for (const status of allStatuses) {
        if (!attendanceSummary[status]) attendanceSummary[status] = 0;
      }

      const attendanceChart = attendanceRaw.map((a) => ({
        date: a.attendance_date,
        check_in_time: a.check_in_time,
        check_out_time: a.check_out_time,
        status: a.status,
      }));

      const overtimeHistory = await OvertimeRequest.findAll({
        include: {
          model: Employee,
          as: "employee",
          attributes: ["full_name"],
        },
        order: [["overtime_date", "DESC"]],
        limit: 10,
      });

      const overtimeTable = overtimeHistory.map((o) => ({
        full_name: o.employee?.full_name || "-",
        overtime_date: o.overtime_date,
        start_time: o.start_time,
        end_time: o.end_time,
        approval_status: o.approval_status,
      }));

      const employeeList = await Employee.findAll({
        include: [
          {
            model: Department,
            as: "department",
            attributes: ["department_name"],
          },
          { model: Position, as: "position", attributes: ["position_name"] },
        ],
        attributes: ["full_name", "email", "join_date"],
        order: [["join_date", "DESC"]],
        limit: 10,
      });

      const employeeTable = employeeList.map((e) => ({
        full_name: e.full_name,
        department_name: e.department?.department_name || "-",
        position_name: e.position?.position_name || "-",
        email: e.email,
        join_date: e.join_date,
      }));

      return res.status(200).json({
        period: {
          name: currentPeriod?.period_name || "Periode Sementara",
          start_date: startDate,
          end_date: endDate,
        },
        summary: {
          total_employees: totalEmployees,
          total_departments: totalDepartments,
          total_positions: totalPositions,
          total_pending_overtime: totalPendingOvertime,
        },
        employment_status_chart: statusCounts,
        attendance_summary: attendanceSummary,
        attendance_bar_chart: attendanceBarChart, 
        attendance_chart: attendanceChart,
        overtime_table: overtimeTable,
        employee_table: employeeTable,
      });
    } catch (error) {
      console.error("Error in HR summary:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};
