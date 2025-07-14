// controller/position
const { Position, Department } = require("../models");

const PositionController = {
  getAll: async (req, res) => {
    try {
      const positions = await Position.findAll({
        attributes: [
          "position_id",
          "position_name",
          "base_salary",
          "job_allowance",
          "department_id",
          "created_at",
          "updated_at",
        ],
        include: {
          model: Department,
          as: "department",
          attributes: ["department_id", "department_name"],
        },
        order: [["position_id", "DESC"]],
      });

      if (!positions.length) {
        return res.status(204).json({
          message: "No position data found",
          data: [],
        });
      }

      res.status(200).json({
        message: "Positions fetched successfully",
        data: positions,
      });
    } catch (error) {
      console.error("getAll error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getById: async (req, res) => {
    try {
      const position = await Position.findByPk(req.params.id, {
        attributes: [
          "position_id",
          "position_name",
          "base_salary",
          "job_allowance",
          "created_at",
          "updated_at",
        ],
        include: {
          model: Department,
          as: "department",
          attributes: ["department_id", "department_name"],
        },
      });

      if (!position) {
        return res.status(404).json({ message: "Position not found" });
      }

      res.status(200).json({
        message: "Position found",
        data: position,
      });
    } catch (error) {
      console.error("getById error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  create: async (req, res) => {
    try {
      const { position_name, base_salary, department_id, job_allowance } =
        req.body;

      const newPosition = await Position.create({
        position_name,
        base_salary,
        department_id,
        job_allowance: job_allowance ?? 0,
      });

      res.status(201).json({
        message: "Position created successfully",
        data: newPosition,
      });
    } catch (error) {
      console.error("create error:", error);
      res.status(500).json({ message: "Failed to create position" });
    }
  },

  update: async (req, res) => {
    try {
      const { position_name, base_salary, department_id, job_allowance } =
        req.body;

      const position = await Position.findByPk(req.params.id);
      if (!position) {
        return res.status(404).json({ message: "Position not found" });
      }

      await position.update({
        position_name,
        base_salary,
        department_id,
        job_allowance,
      });

      res.status(200).json({
        message: "Position updated successfully",
        data: position,
      });
    } catch (error) {
      console.error("update error:", error);
      res.status(500).json({ message: "Failed to update position" });
    }
  },

  destroy: async (req, res) => {
    try {
      const position = await Position.findByPk(req.params.id);
      if (!position) {
        return res.status(404).json({ message: "Position not found" });
      }

      await position.destroy();
      res.status(200).json({ message: "Position deleted successfully" });
    } catch (error) {
      console.error("destroy error:", error);
      res.status(500).json({ message: "Failed to delete position" });
    }
  },
};

module.exports = PositionController;
