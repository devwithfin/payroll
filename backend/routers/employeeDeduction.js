const express = require("express");
const router = express.Router();
const employeeDeductionController = require("../controllers/EmployeeDeductionController");

router.get("/", employeeDeductionController.getAll);

router.get("/:id", employeeDeductionController.getById);

router.post("/", employeeDeductionController.create);

router.put("/:id", employeeDeductionController.update);

router.delete("/:id", employeeDeductionController.destroy);

module.exports = router;
