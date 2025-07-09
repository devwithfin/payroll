// controller/position
const { Position } = require("../models");

const PositionController = {
  getAll: async (req, res) => {
    try {
      const positions = await Position.findAll({
        attributes: ["position_id", "position_name", "base_salary", "created_at", "updated_at", "deleted_at"],
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
        attributes: ["position_id", "position_name", "base_salary", "created_at", "updated_at", "deleted_at"],
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
      const { position_name, base_salary } = req.body;
      const newPosition = await Position.create({ position_name, base_salary });

      res.status(200).json({
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
      const { position_name, base_salary } = req.body;
      const position = await Position.findByPk(req.params.id);

      if (!position) {
        return res.status(404).json({ message: "Position not found" });
      }

      await position.update({ position_name, base_salary });

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
