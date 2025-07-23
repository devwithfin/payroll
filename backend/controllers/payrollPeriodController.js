const {
  PayrollPeriod,
  Employee,
  PayrollDetail,
  EmployeeAllowance,
  EmployeeDeduction,
  CalculatedOvertime,
  Attendance,
  Position,
  TaxBpjsConfig,
} = require("../models");
const { Op } = require("sequelize");

function countWorkingDays(startDate, endDate) {
  let count = 0;
  let current = new Date(startDate);
  endDate = new Date(endDate);

  while (current <= endDate) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) count++;
    current.setDate(current.getDate() + 1);
  }
  return count;
}

function calculatePph21(grossIncome, ptkp, brackets) {
  const taxableIncome = Math.max(0, grossIncome - ptkp);
  let remaining = taxableIncome;
  let tax = 0;

  for (const bracket of brackets) {
    const max = bracket.max ?? Infinity;
    const min = bracket.min;
    const rate = bracket.rate;

    if (remaining > min) {
      const amount = Math.min(remaining, max) - min;
      tax += amount * rate;
    }
  }
  return tax;
}

const PayrollPeriodController = {
  getAll: async (req, res) => {
    try {
      const periods = await PayrollPeriod.findAll({
        attributes: [
          "period_id",
          "period_name",
          "start_date",
          "end_date",
          "payroll_date",
          "status",
        ],
        order: [["start_date", "ASC"]],
      });
      res.status(200).json({ message: "Periods fetched", data: periods });
    } catch (error) {
      console.error("Failed to get periods:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const period = await PayrollPeriod.findByPk(id);
      if (!period) return res.status(404).json({ message: "Payroll period not found" });
      res.status(200).json({ data: period });
    } catch (error) {
      console.error("Failed to get period by ID:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  create: async (req, res) => {
    try {
      const { period_name, start_date, end_date, payroll_date } = req.body;
      const newPeriod = await PayrollPeriod.create({
        period_name,
        start_date,
        end_date,
        payroll_date,
      });
      res.status(201).json({ message: "Period created", data: newPeriod });
    } catch (error) {
      console.error("Failed to create period:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { period_name, start_date, end_date, payroll_date, status } = req.body;
      const period = await PayrollPeriod.findByPk(id);
      if (!period) return res.status(404).json({ message: "Period not found" });

      await period.update({ period_name, start_date, end_date, payroll_date, status });
      res.status(200).json({ message: "Period updated", data: period });
    } catch (error) {
      console.error("Failed to update period:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  destroy: async (req, res) => {
    try {
      const { id } = req.params;
      const period = await PayrollPeriod.findByPk(id);
      if (!period) return res.status(404).json({ message: "Period not found" });

      await period.destroy();
      res.status(200).json({ message: "Period deleted" });
    } catch (error) {
      console.error("Failed to delete period:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

createDraftPayroll: async (req, res) => {
  const periodId = req.params.id;
  try {
    const period = await PayrollPeriod.findByPk(periodId);
    if (!period) return res.status(404).json({ message: "Period not found" });

    if (period.status !== "Open") {
      return res.status(400).json({ message: "Cannot process draft payroll. Period is not open." });
    }

    const { start_date, end_date } = period;

    const employees = await Employee.findAll({
      where: { resignation_date: null },
      include: [{ model: Position, as: "position", attributes: ["base_salary"] }],
    });

    await PayrollDetail.destroy({
      where: { period_id: periodId, payroll_status: "Draft" },
    });

    for (const emp of employees) {
      const employeeId = emp.employee_id;
      const totalWorkingDays = countWorkingDays(start_date, end_date);

      const totalAttendance = await Attendance.count({
        where: {
          employee_id: employeeId,
          attendance_date: { [Op.between]: [start_date, end_date] },
          status: "present",
        },
      });

      // Hitung base salary proporsional terhadap kehadiran
      const fullBaseSalary = parseFloat(emp.position?.base_salary || 0);
      const baseSalary = totalWorkingDays > 0
        ? (fullBaseSalary / totalWorkingDays) * totalAttendance
        : 0;

      const allowances = await EmployeeAllowance.findAll({
        where: {
          employee_id: employeeId,
          effective_date: { [Op.lte]: end_date },
          [Op.or]: [{ end_date: null }, { end_date: { [Op.gte]: start_date } }],
        },
      });

      const totalAllowances = allowances.reduce(
        (sum, a) => sum + parseFloat(a.amount || 0), 0
      );

      const overtimes = await CalculatedOvertime.findAll({
        where: {
          employee_id: employeeId,
          overtime_date: { [Op.between]: [start_date, end_date] },
        },
      });

      const totalOvertimePay = overtimes.reduce(
        (sum, o) => sum + parseFloat(o.overtime_amount || 0), 0
      );

      const deductions = await EmployeeDeduction.findAll({
        where: {
          employee_id: employeeId,
          effective_date: { [Op.lte]: end_date },
          [Op.or]: [{ end_date: null }, { end_date: { [Op.gte]: start_date } }],
        },
      });

      const otherDeductions = deductions.reduce(
        (sum, d) => sum + parseFloat(d.amount || 0), 0
      );

      const grossSalary = baseSalary + totalAllowances + totalOvertimePay;
      const totalDeductions = otherDeductions;
      const netSalary = grossSalary - totalDeductions;

      await PayrollDetail.create({
        period_id: periodId,
        employee_id: employeeId,
        total_working_days: totalWorkingDays,
        total_attendance_days: totalAttendance,
        base_salary: baseSalary,
        total_allowances: totalAllowances,
        total_overtime_pay: totalOvertimePay,
        gross_salary: grossSalary,
        other_deductions: otherDeductions,
        total_deductions: totalDeductions,
        net_salary: netSalary,
        payroll_status: "Draft",
        is_paid: false,
        payment_date: null,
      });
    }

    res.status(200).json({ message: "Draft payroll processed successfully" });
  } catch (error) {
    console.error("Error processing draft payroll:", error);
    res.status(500).json({ message: "Internal server error" });
  }
},


createFinalPayroll: async (req, res) => {
  const periodId = req.params.id;

  try {
    const period = await PayrollPeriod.findByPk(periodId);
    if (!period) return res.status(404).json({ message: "Period not found" });

    const { start_date, end_date } = period;

    const config = await TaxBpjsConfig.findOne({
      where: {
        effective_start_date: { [Op.lte]: end_date },
        [Op.or]: [
          { effective_end_date: null },
          { effective_end_date: { [Op.gte]: start_date } },
        ],
      },
    });

    if (!config || !config.pph21_rules) {
      return res.status(400).json({ message: "Tax/BPJS config or rules not found" });
    }

    const rules = typeof config.pph21_rules === "string"
      ? JSON.parse(config.pph21_rules)
      : config.pph21_rules;

    const ptkpTable = rules.PTKP || {};
    const brackets = rules.PKP || [];

    const payrolls = await PayrollDetail.findAll({
      where: { period_id: periodId, payroll_status: "Draft" },
      include: [Employee],
    });

    for (const item of payrolls) {
      const emp = item.Employee;

      // Ambil ulang base_salary original dari posisi
      const position = await Position.findByPk(emp.position_id);
      const fullBaseSalary = parseFloat(position?.base_salary || 0);

      // Hitung proporsional base salary berdasarkan kehadiran
      const totalDays = item.total_working_days || 0;
      const attendance = item.total_attendance_days || 0;
      const baseSalaryActual = totalDays > 0 ? (fullBaseSalary / totalDays) * attendance : 0;

      // Ambil ulang tunjangan tetap dari relasi allowance
      const fixedAllowances = await EmployeeAllowance.findAll({
        where: {
          employee_id: emp.employee_id,
          effective_date: { [Op.lte]: end_date },
          [Op.or]: [
            { end_date: null },
            { end_date: { [Op.gte]: start_date } },
          ],
        },
        include: ["allowance"],
      });

      const totalFixedAllowances = fixedAllowances
        .filter((a) => a.allowance?.is_fixed === true)
        .reduce((sum, a) => sum + parseFloat(a.amount || 0), 0);

      const bpjsBase = baseSalaryActual + totalFixedAllowances;

      const ptkp = ptkpTable[emp.pt_kp] || 0;
      const pph21 = calculatePph21(bpjsBase * 12, ptkp, brackets) / 12;

      const bpjs_kesehatan = bpjsBase * parseFloat(config.bpjs_kesehatan_employee_rate || 0);
      const bpjs_jht = bpjsBase * parseFloat(config.bpjs_tk_jht_employee_rate || 0);
      const bpjs_jp = bpjsBase * parseFloat(config.bpjs_tk_jp_employee_rate || 0);
      const bpjs_jkm = bpjsBase * parseFloat(config.bpjs_tk_jkm_employee_rate || 0);

      const totalBPJS = bpjs_kesehatan + bpjs_jht + bpjs_jp + bpjs_jkm;
      const otherDeductions = parseFloat(item.other_deductions || 0);

      const totalDeductions = otherDeductions + totalBPJS + pph21;
      const netSalary = parseFloat(item.gross_salary || 0) - totalDeductions;

      await item.update({
        pph21_deduction: pph21,
        bpjs_kesehatan_deduction: bpjs_kesehatan,
        bpjs_ketenagakerjaan_deduction: bpjs_jht + bpjs_jp + bpjs_jkm,
        total_deductions: totalDeductions,
        net_salary: netSalary,
        payroll_status: "Final",
      });
    }

    await period.update({ status: "Closed" });
    res.status(200).json({ message: "Final payroll processed successfully" });
  } catch (error) {
    console.error("Error finalizing payroll:", error);
    res.status(500).json({ message: "Internal server error" });
  }
},


  createPayrollTransfer: async (req, res) => {
    const periodId = req.params.id;

    try {
      const period = await PayrollPeriod.findByPk(periodId);
      if (!period) return res.status(404).json({ message: "Period not found" });

      const payrolls = await PayrollDetail.findAll({
        where: { period_id: periodId, payroll_status: "Final", is_paid: false },
      });

      for (const item of payrolls) {
        await item.update({
          is_paid: true,
          payment_date: new Date(),
        });
      }

      res.status(200).json({ message: "Payroll marked as paid" });
    } catch (error) {
      console.error("Error processing payroll transfer:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = PayrollPeriodController;
