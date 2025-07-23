// routes/payrollPeriodRoute.js
const express = require("express");
const router = express.Router();
const payrollPeriodController = require("../controllers/payrollPeriodController");

router.get("/", payrollPeriodController.getAll);

router.get("/:id", payrollPeriodController.getById);

router.post("/", payrollPeriodController.create);

router.post("/:id/draft-payroll", payrollPeriodController.createDraftPayroll);
router.post("/process-final/:id", payrollPeriodController.createFinalPayroll);

router.put("/:id", payrollPeriodController.update);

router.delete("/:id", payrollPeriodController.destroy);

module.exports = router;
