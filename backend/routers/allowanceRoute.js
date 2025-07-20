// router/allowance
const express = require("express");
const router = express.Router();
const allowanceController = require("../controllers/allowanceController");

router.get("/", allowanceController.getAll);
router.get("/:id", allowanceController.getById);
router.post("/", allowanceController.create);
router.put("/:id", allowanceController.update);
router.delete("/:id", allowanceController.destroy);

module.exports = router;


module.exports = router;
