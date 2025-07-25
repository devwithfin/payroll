// router/employee-allowance
const express = require("express");
const router = express.Router();
const employeeAllowanceController = require("../controllers/employeeAllowanceController");

const verifyToken = require("../middlewares/verifyToken");
const allowedRole = require("../middlewares/roleMiddleware");

router.use(verifyToken);

router.get("/", allowedRole("HR", "Finance"), employeeAllowanceController.getAll);

router.post("/", allowedRole("HR", "Finance"), employeeAllowanceController.create);

router.put("/:id", allowedRole("HR", "Finance"), employeeAllowanceController.update);

router.delete("/:id", allowedRole("HR", "Finance"), employeeAllowanceController.destroy);

module.exports = router;
