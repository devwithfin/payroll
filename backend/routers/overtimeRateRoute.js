// router/overtime-rate
const express = require("express");
const router = express.Router();
const overtimeRateController = require("../controllers/overtimeRateController");

const verifyToken = require("../middlewares/verifyToken");
const allowedRole = require("../middlewares/roleMiddleware");

router.use(verifyToken);

router.get("/", allowedRole("HR", "Finance"), overtimeRateController.getAll);

router.get("/:id", allowedRole("HR", "Finance"), overtimeRateController.getById);

router.post("/", allowedRole("HR"), overtimeRateController.create);

router.put("/:id", allowedRole("HR"), overtimeRateController.update);

router.delete("/:id", allowedRole("HR"), overtimeRateController.destroy);

module.exports = router;
