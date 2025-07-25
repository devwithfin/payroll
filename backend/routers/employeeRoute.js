// router/employee
const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

const verifyToken = require("../middlewares/verifyToken");
const allowedRole = require("../middlewares/roleMiddleware");

router.use(verifyToken);

router.get("/", allowedRole("HR", "Finance"), employeeController.getAll);

router.get("/:id", allowedRole("HR", "Finance", "Employee"), employeeController.getById);

router.post("/", allowedRole("HR"), employeeController.create);

router.put("/:id", allowedRole("HR"), employeeController.update);

router.delete("/:id", allowedRole("HR"), employeeController.destroy);

module.exports = router;
