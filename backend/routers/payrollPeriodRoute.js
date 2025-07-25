// routes/payroll-period
const express = require("express");
const router = express.Router();
const payrollPeriodController = require("../controllers/payrollPeriodController");
const payrollDetailController = require("../controllers/payrollDetailController");

const verifyToken = require("../middlewares/verifyToken");
const allowedRole = require("../middlewares/roleMiddleware");

router.use(verifyToken);

router.get(
  "/payroll-details/by-period/:id",
  allowedRole("HR", "Finance"),
  payrollDetailController.getByPeriod
);

router.post(
  "/draft-payroll/:id",
  allowedRole("HR","Finance"),
  payrollPeriodController.createDraftPayroll
);

router.post(
  "/final-payroll/:id",
  allowedRole("HR","Finance"),
  payrollPeriodController.createFinalPayroll
);

router.post(
  "/pay/:id",
  allowedRole("Finance"),
  payrollPeriodController.createPayrollTransfer
);

router.get("/", allowedRole("HR","Finance"), payrollPeriodController.getAll);

router.post("/", allowedRole("HR","Finance"), payrollPeriodController.create);

router.put("/:id", allowedRole("HR","Finance"), payrollPeriodController.update);

router.delete("/:id", allowedRole("HR","Finance"), payrollPeriodController.destroy);

router.get("/:id", allowedRole("HR","Finance"), payrollPeriodController.getById);

module.exports = router;
