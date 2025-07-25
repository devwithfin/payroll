// controller/deduction
const { Deduction } = require("../models");

const deductionController = {
  getAll: async (req, res) => {
    try {
      const deductions = await Deduction.findAll({
        attributes: [
          "deduction_id",
          "deduction_name",
          "created_at",
          "updated_at",
        ],
        order: [["deduction_id", "DESC"]],
      });

      if (!deductions.length) {
        return res
          .status(204)
          .json({ message: "No deduction data found", data: [] });
      }

      res.status(200).json({
        message: "Deductions fetched successfully",
        data: deductions,
      });
    } catch (error) {
      console.error("getAll error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getById: async (req, res) => {
    try {
      const deduction = await Deduction.findByPk(req.params.id);
      if (!deduction) {
        return res.status(404).json({ message: "Deduction not found" });
      }

      res.status(200).json({ message: "Deduction found", data: deduction });
    } catch (error) {
      console.error("getById error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  create: async (req, res) => {
    try {
      const { deduction_name } = req.body;

      const newDeduction = await Deduction.create({ deduction_name });

      res.status(201).json({
        message: "Deduction created successfully",
        data: newDeduction,
      });
    } catch (error) {
      console.error("create error:", error);
      res.status(500).json({ message: "Failed to create deduction" });
    }
  },

  update: async (req, res) => {
    try {
      const { deduction_name } = req.body;

      const deduction = await Deduction.findByPk(req.params.id);
      if (!deduction) {
        return res.status(404).json({ message: "Deduction not found" });
      }

      await deduction.update({ deduction_name });

      res.status(200).json({
        message: "Deduction updated successfully",
        data: deduction,
      });
    } catch (error) {
      console.error("update error:", error);
      res.status(500).json({ message: "Failed to update deduction" });
    }
  },

  destroy: async (req, res) => {
    try {
      const deduction = await Deduction.findByPk(req.params.id);
      if (!deduction) {
        return res.status(404).json({ message: "Deduction not found" });
      }

      await deduction.destroy();
      res.status(200).json({ message: "Deduction deleted successfully" });
    } catch (error) {
      console.error("destroy error:", error);
      res.status(500).json({ message: "Failed to delete deduction" });
    }
  },
};

module.exports = deductionController;
