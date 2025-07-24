const express = require("express");
const router = express.Router();
const hrSummaryController = require("../controllers/hrSummaryController");

router.get("/", hrSummaryController.getSummaryData);

module.exports = router;
