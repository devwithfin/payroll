// controller/department
const { Department } = require("../models");

const DepartmentController = {
  getAll: async (req, res) => {
    try {
      const departements = await Department.findAll({
        attributes: ["department_id", "department_name", "created_at", "updated_at", "deleted_at"],
        order: [["department_id", "DESC"]],
      });

      if (!departements.length) {
        return res.status(204).json({
          message: "No department data found",
          data: [],
        });
      }

      res.status(200).json({
        message: "Departments fetched successfully",
        data: departements,
      });
    } catch (error) {
      console.error("getAll error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getById: async (req, res) => {
    try {
      const departement = await Department.findByPk(req.params.id, {
        attributes: ["department_id", "department_name", "created_at", "updated_at", "deleted_at"],
      });

      if (!departement) {
        return res.status(404).json({ message: "Department not found" });
      }

      res.status(200).json({
        message: "Department found",
        data: departement,
      });
    } catch (error) {
      console.error("getById error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  create: async (req, res) => {
    try {
      const { department_name } = req.body;
      const newDepartment = await Department.create({ department_name });

      res.status(200).json({
        message: "Department created successfully",
        data: newDepartment,
      });
    } catch (error) {
      console.error("create error:", error);
      res.status(500).json({ message: "Failed to create department" });
    }
  },

  update: async (req, res) => {
    try { 
      const { department_name } = req.body;
      const department = await Department.findByPk(req.params.id);

      if (!department) {
        return res.status(404).json({ message: "Departement not found" });
      }

      await department.update({ department_name });

      res.status(200).json({
        message: "Department updated successfully",
        data: department,
      });
    } catch (error) {
      console.error("update error:", error);
      res.status(500).json({ message: "Failed to update department" });
    }
  },

  destroy: async (req, res) => {
    try {
      const department = await Department.findByPk(req.params.id);

      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      await department.destroy();

      res.status(200).json({ message: "Department deleted successfully" });
    } catch (error) {
      console.error("destroy error:", error);
      res.status(500).json({ message: "Failed to delete department" });
    }
  },
};

module.exports = DepartmentController;
