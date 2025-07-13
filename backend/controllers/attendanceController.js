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

  getById: async (req, res) => {
    try {
      const attendance = await Attendance.findByPk(req.params.id, {
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
      });

      if (!attendance) {
        return res.status(404).json({ message: "Attendance not found" });
      }

      const plain = attendance.toJSON();
      const formatted = {
        ...plain,
        full_name: plain.employee?.full_name || null,
        employee: undefined,
      };

      res.status(200).json({ message: "Attendance found", data: formatted });
    } catch (error) {
      console.error("getById error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  create: async (req, res) => {
    try {
      const attendanceData = req.body;
      const newAttendance = await Attendance.create(attendanceData);

      res.status(201).json({
        message: "Attendance created successfully",
        data: newAttendance,
      });
    } catch (error) {
      console.error("create error:", error);
      res.status(500).json({ message: "Failed to create attendance" });
    }
  },

  update: async (req, res) => {
    try {
      const attendance = await Attendance.findByPk(req.params.id);
      if (!attendance) {
        return res.status(404).json({ message: "Attendance not found" });
      }

      const updatedData = req.body;
      await attendance.update(updatedData);

      res.status(200).json({
        message: "Attendance updated successfully",
        data: attendance,
      });
    } catch (error) {
      console.error("update error:", error);
      res.status(500).json({ message: "Failed to update attendance" });
    }
  },

  destroy: async (req, res) => {
    try {
      const attendance = await Attendance.findByPk(req.params.id);
      if (!attendance) {
        return res.status(404).json({ message: "Attendance not found" });
      }

      await attendance.destroy();
      res.status(200).json({ message: "Attendance deleted successfully" });
    } catch (error) {
      console.error("destroy error:", error);
      res.status(500).json({ message: "Failed to delete attendance" });
    }
  }
};

module.exports = AttendanceController;
