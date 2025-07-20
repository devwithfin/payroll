// router/overtime-rate
const express = require("express");
const router = express.Router();
const overtimeRateController = require("../controllers/overtimeRateController");

router.get("/", overtimeRateController.getAll);
router.get("/:id", overtimeRateController.getById);
router.post("/", overtimeRateController.create);
router.put("/:id", overtimeRateController.update);
router.delete("/:id", overtimeRateController.destroy);

module.exports = router;
