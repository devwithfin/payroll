// controllers/payrollPeriodController.js
const { PayrollPeriod } = require("../models");

const PayrollPeriodController = {
  getAll: async (req, res) => {
    try {
      const periods = await PayrollPeriod.findAll({
        attributes: [
          "period_id",
          "period_name",
          "start_date",
          "end_date",
          "payroll_date",
          "status",
        ],
        order: [["start_date", "ASC"]],
      });

      res.status(200).json({ message: "Periods fetched", data: periods });
    } catch (error) {
      console.error("Failed to get periods:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const period = await PayrollPeriod.findByPk(id, {
        attributes: [
          "period_id",
          "period_name",
          "start_date",
          "end_date",
          "payroll_date",
          "status",
        ],
      });

      if (!period) {
        return res.status(404).json({ message: "Payroll period not found" });
      }

      res.status(200).json({ data: period });
    } catch (error) {
      console.error("Failed to get period by ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  create: async (req, res) => {
    try {
      const { period_name, start_date, end_date, payroll_date } = req.body;

      const newPeriod = await PayrollPeriod.create({
        period_name,
        start_date,
        end_date,
        payroll_date,
      });

      res.status(201).json({
        message: "Period created successfully",
        data: newPeriod,
      });
    } catch (error) {
      console.error("Failed to create period:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { period_name, start_date, end_date, payroll_date, status } = req.body;

      const period = await PayrollPeriod.findByPk(id);
      if (!period) {
        return res.status(404).json({ message: "Period not found" });
      }

      await period.update({
        period_name,
        start_date,
        end_date,
        payroll_date,
        status,
      });

      res.status(200).json({
        message: "Period updated successfully",
        data: period,
      });
    } catch (error) {
      console.error("Failed to update period:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;

      const period = await PayrollPeriod.findByPk(id);
      if (!period) {
        return res.status(404).json({ message: "Period not found" });
      }

      await period.destroy();
      res.status(200).json({ message: "Period deleted successfully" });
    } catch (error) {
      console.error("Failed to delete period:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = PayrollPeriodController;
