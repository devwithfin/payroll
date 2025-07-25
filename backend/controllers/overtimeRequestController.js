// controller/overtime-requests
const {
  OvertimeRequest,
  Employee,
  Position,
  CalculatedOvertime,
} = require("../models");

const overtimeRequestController = {
  create: async (req, res) => {
    try {
      const {
        employee_id,
        overtime_date,
        start_time,
        end_time,
        reason,
        submitted_by,
      } = req.body;

      const newRequest = await OvertimeRequest.create({
        employee_id,
        overtime_date,
        start_time,
        end_time,
        reason,
        submitted_by,
        request_date: new Date(),
      });

      res.status(201).json({
        message: "Overtime request submitted successfully",
        data: newRequest,
      });
    } catch (error) {
      console.error("create error:", error);
      res.status(500).json({ message: "Failed to submit request" });
    }
  },

  getAll: async (req, res) => {
    try {
      const requests = await OvertimeRequest.findAll({
        include: [
          {
            model: Employee,
            as: "employee",
            attributes: ["employee_id", "full_name"],
          },
          {
            model: Employee,
            as: "Submitter",
            attributes: ["employee_id", "full_name"],
          },
          {
            model: Employee,
            as: "HRDApprover",
            attributes: ["employee_id", "full_name"],
          },
          { model: CalculatedOvertime, as: "calculation" },
        ],
        order: [["request_id", "DESC"]],
      });

      res.status(200).json({
        message: "Requests fetched successfully",
        data: requests,
      });
    } catch (error) {
      console.error("getAll error:", error);
      res.status(500).json({ message: "Failed to fetch requests" });
    }
  },

  getByEmployeeId: async (req, res) => {
    try {
      const { employee_id } = req.params;

      const requests = await OvertimeRequest.findAll({
        where: { employee_id },
        include: [
          {
            model: Employee,
            as: "employee",
            attributes: ["employee_id", "full_name"],
          },
          { model: CalculatedOvertime, as: "calculation" },
        ],
        order: [["request_id", "DESC"]],
      });

      res.status(200).json({
        message: "Requests by employee fetched",
        data: requests,
      });
    } catch (error) {
      console.error("getByEmployeeId error:", error);
      res.status(500).json({ message: "Failed to fetch requests by employee" });
    }
  },

  updateApproval: async (req, res) => {
    try {
      const { request_id } = req.params;
      const { approval_status, approved_by_hrd, notes_approval } = req.body;

      const request = await OvertimeRequest.findByPk(request_id);
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }

      const approval_date_hrd = new Date();

      await request.update({
        approval_status,
        approved_by_hrd,
        notes_approval,
        approval_date_hrd,
      });

      res.status(200).json({ message: "Request approved", data: request });
    } catch (error) {
      console.error("updateApproval error:", error);
      res.status(500).json({ message: "Failed to approve request" });
    }
  },

  destroy: async (req, res) => {
    try {
      const { request_id } = req.params;
      const request = await OvertimeRequest.findByPk(request_id);
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }

      await request.destroy();
      res.status(200).json({ message: "Request deleted" });
    } catch (error) {
      console.error("destroy error:", error);
      res.status(500).json({ message: "Failed to delete request" });
    }
  },
};

module.exports = overtimeRequestController;
