const express = require("express");
const router = express.Router();
const payrollPeriodController = require("../controllers/payrollPeriodController");

router.get("/", payrollPeriodController.getAllPeriods);

module.exports = router;
