// routes/payrollPeriodRoute.js
const express = require("express");
const router = express.Router();
const PayrollPeriodController = require("../controllers/payrollPeriodController");

router.get("/", PayrollPeriodController.getAll);

router.get("/:id", PayrollPeriodController.getById);

router.post("/", PayrollPeriodController.create);

router.put("/:id", PayrollPeriodController.update);

router.delete("/:id", PayrollPeriodController.destroy);

module.exports = router;
