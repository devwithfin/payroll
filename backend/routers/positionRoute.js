// router/position
const express = require("express");
const router = express.Router();
const positionController = require("../controllers/positionController");

const verifyToken = require("../middlewares/verifyToken");
const allowedRole = require("../middlewares/roleMiddleware");

router.use(verifyToken);


router.get("/", allowedRole("HR", "Finance", "Employee"), positionController.getAll);

router.get("/:id", allowedRole("HR", "Finance", "Employee"), positionController.getById);

router.post("/", allowedRole("HR"), positionController.create);

router.put("/:id", allowedRole("HR"), positionController.update);

router.delete("/:id", allowedRole("HR"), positionController.destroy);

module.exports = router;
