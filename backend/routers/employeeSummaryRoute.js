// router/employee-summary
const express = require("express");
const router = express.Router();
const employeeSummaryController = require("../controllers/employeeSummaryController");

const verifyToken = require("../middlewares/verifyToken");
const allowedRole = require("../middlewares/roleMiddleware");

router.use(verifyToken);

router.get(
  "/:id",
  allowedRole("HR", "Finance", "Employee"),
  employeeSummaryController.getSummaryData
);

module.exports = router;
