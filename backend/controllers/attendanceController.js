// controller/attendance
const { Attendance, Employee } = require("../models");

const AttendanceController = {
  getAll: async (req, res) => {
    try {
      const attendances = await Attendance.findAll({
        attributes: [
          "attendance_id", "employee_id", "attendance_date", "check_in_time",
          "check_out_time", "status", "notes", "status_processed"
        ],
        include: [
          {
            model: Employee,
            as: "employee",
            attributes: ["full_name"]
          }
        ],
        order: [["attendance_id", "DESC"]],
      });

      if (!attendances.length) {
        return res.status(204).json({ message: "No attendance data found", data: [] });
      }

      const formatted = attendances.map((emp) => {
        const plain = emp.toJSON();
        return {
          ...plain,
          full_name: plain.employee?.full_name || null,
          employee: undefined,
        };
      });

      res.status(200).json({
        message: "Attendances fetched successfully",
        data: formatted,
      });
    } catch (error) {
      console.error("getAll error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

getByEmployeeId: async (req, res) => {
  try {
    const { employee_id } = req.params;

    const attendance = await Attendance.findAll({
      where: { employee_id },
      attributes: [
        "attendance_id",
        "employee_id",
        "attendance_date",
        "check_in_time",
        "check_out_time",
        "status",
        "notes",
        "status_processed",
      ],
      order: [["attendance_date", "DESC"]],
    });

    return res.status(200).json({
      message: attendance.length > 0
        ? "Attendance records found"
        : "No attendance records found",
      data: attendance,
    });

  } catch (error) {
    console.error("getByEmployeeId error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
},



clockIn: async (req, res) => {
  try {
    console.log("📥 Clock-in body received:", req.body); // ✅ Tambahkan log ini
    const { employee_id } = req.body;
    const today = new Date().toISOString().split("T")[0];
    const now = new Date().toTimeString().split(" ")[0];

    const existing = await Attendance.findOne({
      where: { employee_id, attendance_date: today },
    });

    if (existing) {
      return res.status(400).json({ message: "Already clocked in today" });
    }

    const newAttendance = await Attendance.create({
      employee_id,
      attendance_date: today,
      check_in_time: now,
      check_out_time: null,
      status: "Present",
      status_processed: "Unprocessed",
    });

    res.status(201).json({
      message: "Clock-in recorded successfully",
      data: newAttendance,
    });
  } catch (error) {
    console.error("clockIn error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
},


clockOut: async (req, res) => {
  try {
    const { employee_id } = req.body;
    const today = new Date().toISOString().split("T")[0];
    const now = new Date().toTimeString().split(" ")[0];

    const attendance = await Attendance.findOne({
      where: { employee_id, attendance_date: today },
    });

    if (!attendance) {
      return res.status(404).json({ message: "No clock-in record found for today" });
    }

    if (attendance.check_out_time) {
      return res.status(400).json({ message: "Already clocked out today" });
    }

    await attendance.update({ check_out_time: now });

    res.status(200).json({
      message: "Clock-out recorded successfully",
      data: attendance,
    });
  } catch (error) {
    console.error("clockOut error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
};

module.exports = AttendanceController;
