// routes/allowance
const express = require("express");
const router = express.Router();
const allowanceController = require("../controllers/allowanceController");

const verifyToken = require("../middlewares/verifyToken");
const allowedRole = require("../middlewares/roleMiddleware");

router.use(verifyToken);

router.get("/", allowedRole("HR", "Finance"), allowanceController.getAll);

router.get("/:id", allowedRole("HR", "Finance"), allowanceController.getById);

router.post("/", allowedRole("HR"), allowanceController.create);

router.put("/:id", allowedRole("HR"), allowanceController.update);

router.delete("/:id", allowedRole("HR"), allowanceController.destroy);

module.exports = router;
