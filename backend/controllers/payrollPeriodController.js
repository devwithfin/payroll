const { PayrollPeriod } = require("../models");

exports.getAllPeriods = async (req, res) => {
  try {
    const periods = await PayrollPeriod.findAll({
      attributes: ["period_id", "period_name", "start_date", "end_date"],
      order: [["start_date", "ASC"]],
    });

    res.json({ data: periods });
  } catch (error) {
    console.error("Failed to get periods:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
