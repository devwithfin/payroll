// router/deduction
const express = require("express");
const router = express.Router();
const deductionController = require("../controllers/deductionController");

router.get("/", deductionController.getAll);
router.get("/:id", deductionController.getById);
router.post("/", deductionController.create);
router.put("/:id", deductionController.update);
router.delete("/:id", deductionController.destroy);

module.exports = router;
