// router/attendance
const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

router.get("/", attendanceController.getAll);
router.get("/employee/:employee_id", attendanceController.getByEmployeeId);
router.post("/clock-in", attendanceController.clockIn);
router.post("/clock-out", attendanceController.clockOut);

module.exports = router;
