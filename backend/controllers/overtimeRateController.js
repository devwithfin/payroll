// controller/overtime-rate
const { OvertimeRate } = require("../models");

const overtimeRateController = {
  getAll: async (req, res) => {
    try {
      const rates = await OvertimeRate.findAll({
        order: [["rate_id", "DESC"]],
      });

      if (!rates.length) {
        return res.status(204).json({ message: "No overtime rates found", data: [] });
      }

      res.status(200).json({
        message: "Overtime rates fetched successfully",
        data: rates,
      });
    } catch (error) {
      console.error("getAll error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getById: async (req, res) => {
    try {
      const rate = await OvertimeRate.findByPk(req.params.id);
      if (!rate) {
        return res.status(404).json({ message: "Overtime rate not found" });
      }

      res.status(200).json({ message: "Overtime rate found", data: rate });
    } catch (error) {
      console.error("getById error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  create: async (req, res) => {
    try {
      const { rate_type, multiplier, description } = req.body;

      const newRate = await OvertimeRate.create({
        rate_type,
        multiplier,
        description,
      });

      res.status(201).json({
        message: "Overtime rate created successfully",
        data: newRate,
      });
    } catch (error) {
      console.error("create error:", error);
      res.status(500).json({ message: "Failed to create overtime rate" });
    }
  },

  update: async (req, res) => {
    try {
      const { rate_type, multiplier, description } = req.body;

      const rate = await OvertimeRate.findByPk(req.params.id);
      if (!rate) {
        return res.status(404).json({ message: "Overtime rate not found" });
      }

      await rate.update({ rate_type, multiplier, description });

      res.status(200).json({
        message: "Overtime rate updated successfully",
        data: rate,
      });
    } catch (error) {
      console.error("update error:", error);
      res.status(500).json({ message: "Failed to update overtime rate" });
    }
  },

  destroy: async (req, res) => {
    try {
      const rate = await OvertimeRate.findByPk(req.params.id);
      if (!rate) {
        return res.status(404).json({ message: "Overtime rate not found" });
      }

      await rate.destroy();  
      res.status(200).json({ message: "Overtime rate deleted successfully" });
    } catch (error) {
      console.error("destroy error:", error);
      res.status(500).json({ message: "Failed to delete overtime rate" });
    }
  },
};

module.exports = overtimeRateController;
