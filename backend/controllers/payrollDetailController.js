// controller/payroll-detail
const { PayrollDetail, Employee } = require("../models");

module.exports = {
  getByPeriod: async (req, res) => {
    try {
      const periodId = req.params.id;

      const details = await PayrollDetail.findAll({
        where: { period_id: periodId },
        include: [
          {
            model: Employee,
            attributes: ["employee_id", "full_name"],
          },
        ],
      });

      const data = details.map((item) => ({
        employee_id: item.employee_id,
        full_name: item.Employee?.full_name || "Unknown",
        gross_salary: item.gross_salary,
        net_salary: item.net_salary,
        base_salary: item.base_salary,
        total_allowances: item.total_allowances,
        total_overtime_pay: item.total_overtime_pay,
        total_deductions: item.total_deductions,
        payroll_status: item.payroll_status,
      }));

      res.status(200).json({ message: "Payroll details fetched", data });
    } catch (error) {
      console.error("Error fetching payroll details:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};
