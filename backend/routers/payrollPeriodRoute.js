// routes/payrollPeriodRoute.js
const express = require("express");
const router = express.Router();
const payrollPeriodController = require("../controllers/payrollPeriodController");

router.get("/", payrollPeriodController.getAll);

router.get("/:id", payrollPeriodController.getById);

router.post("/", payrollPeriodController.create);

router.post("/draft-payroll/:id", payrollPeriodController.createDraftPayroll);

router.post("/final-payroll/:id", payrollPeriodController.createFinalPayroll);

router.post("/pay/:id", payrollPeriodController.createPayrollTransfer);

router.put("/:id", payrollPeriodController.update);

router.delete("/:id", payrollPeriodController.destroy);

module.exports = router;
