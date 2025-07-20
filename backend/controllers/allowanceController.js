// controller/allowance
const { Allowance } = require("../models");

const allowanceController = {
  getAll: async (req, res) => {
    try {
      const allowances = await Allowance.findAll({
        attributes: [
          "allowance_id",
          "allowance_name",
          "default_amount",
          "is_fixed",
          "created_at",
          "updated_at",
        ],
        order: [["allowance_id", "DESC"]],
      });

      if (!allowances.length) {
        return res.status(204).json({ message: "No allowance data found", data: [] });
      }

      res.status(200).json({
        message: "Allowances fetched successfully",
        data: allowances,
      });
    } catch (error) {
      console.error("getAll error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getById: async (req, res) => {
    try {
      const allowance = await Allowance.findByPk(req.params.id);
      if (!allowance) {
        return res.status(404).json({ message: "Allowance not found" });
      }

      res.status(200).json({ message: "Allowance found", data: allowance });
    } catch (error) {
      console.error("getById error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  create: async (req, res) => {
    try {
      const { allowance_name, default_amount, is_fixed } = req.body;

      const newAllowance = await Allowance.create({
        allowance_name,
        default_amount: default_amount ?? null,
        is_fixed,
      });

      res.status(201).json({
        message: "Allowance created successfully",
        data: newAllowance,
      });
    } catch (error) {
      console.error("create error:", error);
      res.status(500).json({ message: "Failed to create allowance" });
    }
  },

  update: async (req, res) => {
    try {
      const { allowance_name, default_amount, is_fixed } = req.body;

      const allowance = await Allowance.findByPk(req.params.id);
      if (!allowance) {
        return res.status(404).json({ message: "Allowance not found" });
      }

      await allowance.update({
        allowance_name,
        default_amount,
        is_fixed,
      });

      res.status(200).json({
        message: "Allowance updated successfully",
        data: allowance,
      });
    } catch (error) {
      console.error("update error:", error);
      res.status(500).json({ message: "Failed to update allowance" });
    }
  },

  destroy: async (req, res) => {
    try {
      const allowance = await Allowance.findByPk(req.params.id);
      if (!allowance) {
        return res.status(404).json({ message: "Allowance not found" });
      }

      await allowance.destroy(); // soft delete
      res.status(200).json({ message: "Allowance deleted successfully" });
    } catch (error) {
      console.error("destroy error:", error);
      res.status(500).json({ message: "Failed to delete allowance" });
    }
  },
};

module.exports = allowanceController;
