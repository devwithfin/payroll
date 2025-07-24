const {
  EmployeeAllowance,
  Employee,
  Allowance,
  Position,
} = require("../models");

const EmployeeAllowanceController = {
 getAll: async (req, res) => {
    try {
      const allowances = await EmployeeAllowance.findAll({
        include: [
          {
            model: Employee,
            as: "employee",
            attributes: ["employee_id", "full_name"],
            include: [
              {
                model: Position,
                as: "position",
                attributes: ["position_name", "job_allowance"],
              },
            ],
          },
          {
            model: Allowance,
            as: "allowance",
            attributes: ["allowance_id", "allowance_name"],
          },
        ],
      });

      const formatted = allowances.map((item) => {
        const plain = item.toJSON();
        return {
          emp_allowance_id: plain.emp_allowance_id,
          employee_id: plain.employee_id,
          allowance_id: plain.allowance_id,
          amount: plain.amount,
          effective_date: plain.effective_date,
          end_date: plain.end_date,
          full_name: plain.employee?.full_name || "Unknown",
          allowance_name: plain.allowance?.allowance_name || "Unknown",
          position_name: plain.employee?.position?.position_name || "-",
          job_allowance: plain.employee?.position?.job_allowance || 0,
        };
      });

      res.status(200).json({
        message: "Employee allowances fetched successfully",
        data: formatted,
      });
    } catch (error) {
      console.error("getAll error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getById: async (req, res) => {
    try {
      const data = await EmployeeAllowance.findByPk(req.params.id, {
        include: [
          {
            model: Employee,
            attributes: ["employee_id", "full_name"],
            include: {
              model: Position,
              as: "position",
              attributes: ["position_name", "job_allowance"],
            },
          },
          {
            model: Allowance,
            attributes: ["allowance_id", "allowance_name"],
          },
        ],
      });

      if (!data) {
        return res
          .status(404)
          .json({ message: "Employee allowance not found" });
      }

      const plain = data.toJSON();
      const formatted = {
        emp_allowance_id: plain.emp_allowance_id,
        employee_id: plain.employee_id,
        allowance_id: plain.allowance_id,
        amount: plain.amount,
        effective_date: plain.effective_date,
        end_date: plain.end_date,
        full_name: plain.Employee?.full_name || undefined,
        allowance_name: plain.Allowance?.allowance_name || undefined,
        position_name: plain.Employee?.position?.position_name || undefined,
        job_allowance: plain.Employee?.position?.job_allowance || 0,
      };

      res.status(200).json({
        message: "Employee allowance found",
        data: formatted,
      });
    } catch (error) {
      console.error("getById error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  create: async (req, res) => {
    const { employee_id, allowance_id, effective_date, end_date, amount } =
      req.body;

    try {
      let finalAmount = amount;

      if (!finalAmount) {
        const allowance = await Allowance.findByPk(allowance_id);
        if (!allowance) {
          return res.status(404).json({ message: "Allowance not found" });
        }

        if (allowance.default_amount !== null) {
          finalAmount = allowance.default_amount;
        } else {
          const employee = await Employee.findByPk(employee_id, {
            include: {
              model: Position,
              as: "position",
              attributes: ["job_allowance"],
            },
          });

          if (!employee || !employee.position) {
            return res
              .status(404)
              .json({ message: "Employee or position not found" });
          }

          finalAmount = employee.position.job_allowance;
        }
      }

      const created = await EmployeeAllowance.create({
        employee_id,
        allowance_id,
        amount: finalAmount,
        effective_date,
        end_date,
      });

      res.status(201).json({
        message: "Employee allowance created successfully",
        data: created,
      });
    } catch (error) {
      console.error("create error:", error);
      res.status(500).json({ message: "Failed to create employee allowance" });
    }
  },

  update: async (req, res) => {
    try {
      const data = await EmployeeAllowance.findByPk(req.params.id);
      if (!data) {
        return res
          .status(404)
          .json({ message: "Employee allowance not found" });
      }

      const { allowance_id, amount, effective_date, end_date } = req.body;

      await data.update({
        allowance_id: allowance_id ?? data.allowance_id,
        amount: amount ?? data.amount,
        effective_date: effective_date ?? data.effective_date,
        end_date: end_date ?? data.end_date,
      });

      res.status(200).json({
        message: "Employee allowance updated successfully",
        data,
      });
    } catch (error) {
      console.error("update error:", error);
      res.status(500).json({ message: "Failed to update employee allowance" });
    }
  },

  destroy: async (req, res) => {
    try {
      const data = await EmployeeAllowance.findByPk(req.params.id);
      if (!data) {
        return res
          .status(404)
          .json({ message: "Employee allowance not found" });
      }

      await data.destroy();

      res.status(200).json({
        message: "Employee allowance deleted successfully",
      });
    } catch (error) {
      console.error("destroy error:", error);
      res.status(500).json({ message: "Failed to delete employee allowance" });
    }
  },
};

module.exports = EmployeeAllowanceController;
