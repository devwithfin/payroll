// router/hr-summary
const express = require("express");
const router = express.Router();
const hrSummaryController = require("../controllers/hrSummaryController");

const verifyToken = require("../middlewares/verifyToken");
const allowedRole = require("../middlewares/roleMiddleware");

router.use(verifyToken);

router.get("/", allowedRole("HR"), hrSummaryController.getSummaryData);

module.exports = router;
