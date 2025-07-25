// controller/employee-deduction
const { EmployeeDeduction, Employee, Deduction } = require("../models");

const EmployeeDeductionController = {
  getAll: async (req, res) => {
    try {
      const deductions = await EmployeeDeduction.findAll({
        include: [
          {
            model: Employee,
            attributes: ["employee_id", "full_name"],
          },
          {
            model: Deduction,
            attributes: ["deduction_id", "deduction_name"],
          },
        ],
      });

      const formatted = deductions.map((item) => {
        const plain = item.toJSON();
        return {
          emp_deduction_id: plain.emp_deduction_id,
          employee_id: plain.employee_id,
          deduction_id: plain.deduction_id,
          amount: plain.amount,
          effective_date: plain.effective_date,
          end_date: plain.end_date,
          full_name: plain.Employee?.full_name || undefined,
          deduction_name: plain.Deduction?.deduction_name || undefined,
        };
      });

      return res.status(200).json({
        message: formatted.length
          ? "Employee deductions fetched successfully"
          : "No employee deduction data found",
        data: formatted,
      });
    } catch (error) {
      console.error("getAll error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getById: async (req, res) => {
    try {
      const data = await EmployeeDeduction.findByPk(req.params.id, {
        include: [
          {
            model: Employee,
            attributes: ["employee_id", "full_name"],
          },
          {
            model: Deduction,
            attributes: ["deduction_id", "deduction_name"],
          },
        ],
      });

      if (!data) {
        return res
          .status(404)
          .json({ message: "Employee deduction not found" });
      }

      const plain = data.toJSON();
      const formatted = {
        emp_deduction_id: plain.emp_deduction_id,
        employee_id: plain.employee_id,
        deduction_id: plain.deduction_id,
        amount: plain.amount,
        effective_date: plain.effective_date,
        end_date: plain.end_date,
        full_name: plain.Employee?.full_name || undefined,
        deduction_name: plain.Deduction?.deduction_name || undefined,
      };

      res.status(200).json({
        message: "Employee deduction found",
        data: formatted,
      });
    } catch (error) {
      console.error("getById error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  create: async (req, res) => {
    const { employee_id, deduction_id, amount, effective_date, end_date } =
      req.body;

    try {
      const created = await EmployeeDeduction.create({
        employee_id,
        deduction_id,
        amount,
        effective_date,
        end_date,
      });

      res.status(201).json({
        message: "Employee deduction created successfully",
        data: created,
      });
    } catch (error) {
      console.error("create error:", error);
      res.status(500).json({ message: "Failed to create employee deduction" });
    }
  },

  update: async (req, res) => {
    try {
      const data = await EmployeeDeduction.findByPk(req.params.id);
      if (!data) {
        return res
          .status(404)
          .json({ message: "Employee deduction not found" });
      }

      const { deduction_id, amount, effective_date, end_date } = req.body;

      await data.update({
        deduction_id: deduction_id ?? data.deduction_id,
        amount: amount ?? data.amount,
        effective_date: effective_date ?? data.effective_date,
        end_date: end_date ?? data.end_date,
      });

      res.status(200).json({
        message: "Employee deduction updated successfully",
        data,
      });
    } catch (error) {
      console.error("update error:", error);
      res.status(500).json({ message: "Failed to update employee deduction" });
    }
  },

  destroy: async (req, res) => {
    try {
      const data = await EmployeeDeduction.findByPk(req.params.id);
      if (!data) {
        return res
          .status(404)
          .json({ message: "Employee deduction not found" });
      }

      await data.destroy();

      res.status(200).json({
        message: "Employee deduction deleted successfully",
      });
    } catch (error) {
      console.error("destroy error:", error);
      res.status(500).json({ message: "Failed to delete employee deduction" });
    }
  },
};

module.exports = EmployeeDeductionController;
