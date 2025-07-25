// routes/attendance
const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

const verifyToken = require("../middlewares/verifyToken");
const allowedRole = require("../middlewares/roleMiddleware");

router.use(verifyToken);

router.get("/", allowedRole("HR", "Finance"), attendanceController.getAll);

router.get("/employee/:employee_id", allowedRole("HR", "Finance", "Employee"), attendanceController.getByEmployeeId);

router.post("/clock-in",  allowedRole("HR", "Finance", "Employee"), attendanceController.clockIn);

router.post("/clock-out",  allowedRole("HR", "Finance", "Employee"), attendanceController.clockOut);

module.exports = router;
