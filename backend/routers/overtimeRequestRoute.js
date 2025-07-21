const express = require("express");
const router = express.Router();

const overtimeRequestController = require("../controllers/overtimeRequestController");

router.get("/", overtimeRequestController.getAll);
router.post("/", overtimeRequestController.create);
router.get("/employee/:employee_id", overtimeRequestController.getByEmployeeId);
router.put("/approve/:request_id", overtimeRequestController.updateApproval);
router.delete("/:request_id", overtimeRequestController.destroy);

module.exports = router;
