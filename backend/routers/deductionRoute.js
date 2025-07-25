// router/deduction
const express = require("express");
const router = express.Router();
const deductionController = require("../controllers/deductionController");

const verifyToken = require("../middlewares/verifyToken");
const allowedRole = require("../middlewares/roleMiddleware");
router.use(verifyToken);

router.get("/", allowedRole("HR", "Finance"), deductionController.getAll);

router.get("/:id", allowedRole("HR", "Finance"), deductionController.getById);

router.post("/", allowedRole("HR", "Finance"), deductionController.create);

router.put("/:id", allowedRole("HR", "Finance"), deductionController.update);

router.delete("/:id", allowedRole("HR", "Finance"), deductionController.destroy);

module.exports = router;
