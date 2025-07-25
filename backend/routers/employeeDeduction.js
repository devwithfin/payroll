// router/employee-deduction
const express = require("express");
const router = express.Router();
const employeeDeductionController = require("../controllers/EmployeeDeductionController");

const verifyToken = require("../middlewares/verifyToken");
const allowedRole = require("../middlewares/roleMiddleware");

router.use(verifyToken);

router.get("/", allowedRole("HR", "Finance"), employeeDeductionController.getAll);

router.get("/:id", allowedRole("HR", "Finance"), employeeDeductionController.getById);

router.post("/", allowedRole("HR", "Finance"), employeeDeductionController.create);

router.put("/:id", allowedRole("HR", "Finance"), employeeDeductionController.update);

router.delete("/:id", allowedRole("HR", "Finance"), employeeDeductionController.destroy);

module.exports = router;
