const express = require("express");
const router = express.Router();
const employeeSummaryController = require("../controllers/employeeSummaryController");

router.get("/:id", employeeSummaryController.getSummaryData);

module.exports = router;
