// router/overtime-request
const express = require("express");
const router = express.Router();

const overtimeRequestController = require("../controllers/overtimeRequestController");

const verifyToken = require("../middlewares/verifyToken");
const allowedRole = require("../middlewares/roleMiddleware");

router.use(verifyToken);

router.get("/", allowedRole("HR", "Finance"), overtimeRequestController.getAll);

router.post("/", allowedRole("Employee"), overtimeRequestController.create);

router.get(
  "/employee/:employee_id",
  allowedRole("HR", "Finance", "Employee"),
  overtimeRequestController.getByEmployeeId
);

router.put(
  "/approve/:request_id",
  allowedRole("HR"),
  overtimeRequestController.updateApproval
);

router.delete(
  "/:request_id",
  allowedRole("HR"),
  overtimeRequestController.destroy
);

module.exports = router;
