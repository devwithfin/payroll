// router/department
const express = require("express");
const router = express.Router();
const departmentController = require("../controllers/departmentController");

const verifyToken = require("../middlewares/verifyToken");
const allowedRole = require("../middlewares/roleMiddleware");

router.use(verifyToken);

router.get("/", allowedRole("HR", "Finance", "Employee"), departmentController.getAll);

router.get("/:id", allowedRole("HR", "Finance", "Employee"), departmentController.getById);

router.post("/", allowedRole("HR"), departmentController.create);

router.put("/:id", allowedRole("HR"), departmentController.update);

router.delete("/:id", allowedRole("HR"), departmentController.destroy);

module.exports = router;
