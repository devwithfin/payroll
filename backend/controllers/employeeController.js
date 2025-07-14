// controller/employee
const { Employee, Department, Position } = require("../models");

const EmployeeController = {
  getAll: async (req, res) => {
    try {
      const employees = await Employee.findAll({
        attributes: [
          "employee_id",
          "id_user",
          "position_id",
          "department_id",
          "employee_nik",
          "full_name",
          "dob",
          "gender",
          "address",
          "phone_number",
          "email",
          "employment_status",
          "join_date",
          "resignation_date",
          "npwp_number",
          "pt_kp",
          "role",
          "bank_account_number",
          "bank_name",
          "created_at",
          "updated_at",
          "deleted_at",
        ],
        include: [
          {
            model: Department,
            as: "department",
            attributes: ["department_name"],
          },
          {
            model: Position,
            as: "position",
            attributes: ["position_name", "job_allowance"], 
          },
        ],
        order: [["employee_id", "DESC"]],
      });

      if (!employees.length) {
        return res
          .status(204)
          .json({ message: "No employee data found", data: [] });
      }

      const formatted = employees.map((emp) => {
        const plain = emp.toJSON();
        return {
          ...plain,
          department_name: plain.department?.department_name || undefined,
          position_name: plain.position?.position_name || undefined,
          job_allowance: plain.position?.job_allowance || 0,
          department: undefined,
          position: undefined,
        };
      });

      res.status(200).json({
        message: "Employees fetched successfully",
        data: formatted,
      });
    } catch (error) {
      console.error("getAll error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getById: async (req, res) => {
    try {
      const emp = await Employee.findByPk(req.params.id, {
        attributes: [
          "employee_id",
          "id_user",
          "position_id",
          "department_id",
          "employee_nik",
          "full_name",
          "dob",
          "gender",
          "address",
          "phone_number",
          "email",
          "employment_status",
          "join_date",
          "resignation_date",
          "npwp_number",
          "pt_kp",
          "role",
          "bank_account_number",
          "bank_name",
          "created_at",
          "updated_at",
          "deleted_at",
        ],
        include: [
          {
            model: Department,
            as: "department",
            attributes: ["department_name"],
          },
          {
            model: Position,
            as: "position",
            attributes: ["position_name", "job_allowance"],
          },
        ],
      });

      if (!emp) {
        return res.status(404).json({ message: "Employee not found" });
      }

      const plain = emp.toJSON();
      const formatted = {
        ...plain,
        department_name: plain.department?.department_name || undefined,
        position_name: plain.position?.position_name || undefined,
        job_allowance: plain.position?.job_allowance || 0,
        department: undefined,
        position: undefined,
      };

      res.status(200).json({ message: "Employee found", data: formatted });
    } catch (error) {
      console.error("getById error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  create: async (req, res) => {
    try {
      const employeeData = req.body;
      const newEmployee = await Employee.create(employeeData);

      res.status(201).json({
        message: "Employee created successfully",
        data: newEmployee,
      });
    } catch (error) {
      console.error("create error:", error);
      res.status(500).json({ message: "Failed to create employee" });
    }
  },

  update: async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      const updatedData = req.body;
      await employee.update(updatedData);

      res.status(200).json({
        message: "Employee updated successfully",
        data: employee,
      });
    } catch (error) {
      console.error("update error:", error);
      res.status(500).json({ message: "Failed to update employee" });
    }
  },

  destroy: async (req, res) => {
    try {
      const employee = await Employee.findByPk(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }

      await employee.destroy();
      res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
      console.error("destroy error:", error);
      res.status(500).json({ message: "Failed to delete employee" });
    }
  },
};

module.exports = EmployeeController;
