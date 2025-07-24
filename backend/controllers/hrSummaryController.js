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

      let period = await PayrollPeriod.findOne({
        where: { status: "Closed" },
        order: [["end_date", "DESC"]],
      });

      if (!period) {
        period = await PayrollPeriod.findOne({
          order: [["end_date", "DESC"]],
        });
      }

      let startDate, endDate;
      if (period) {
        startDate = period.start_date;
        endDate = period.end_date;
      } else {
        const now = new Date();
        endDate = now;
        startDate = new Date();
        startDate.setMonth(now.getMonth() - 1);
      }


      const [totalEmployees, totalDepartments, totalPositions, totalPendingOvertime] =
        await Promise.all([
          Employee.count(),
          Department.count(),
          Position.count(),
          OvertimeRequest.count({ where: { approval_status: "Pending" } }),
        ]);

      const employmentStatuses = ["Permanent", "Contract", "Intern"];
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
        attributes: ["attendance_date", "status", "check_in_time", "check_out_time"],
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
          { model: Department, as: "department", attributes: ["department_name"] },
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
          name: period?.period_name || "Periode Sementara",
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
