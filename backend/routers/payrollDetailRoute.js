// router/payroll-detail 
const express = require("express");
const router = express.Router();
const payrollDetailController = require("../controllers/payrollDetailController");

const verifyToken = require("../middlewares/verifyToken");
const allowedRole = require("../middlewares/roleMiddleware");

router.use(verifyToken);

router.get(
  "/by-period/:id",
  allowedRole("HR", "Finance"),
  payrollDetailController.getByPeriod
);

module.exports = router;
