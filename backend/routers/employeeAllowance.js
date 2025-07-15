// router/employee-allowance
const express = require('express');
const router = express.Router();
const employeeAllowanceController = require('../controllers/employeeAllowanceController');

router.get('/', employeeAllowanceController.getAll);

// router.post('/', employeeAllowanceController.create);

// router.put('/:id', employeeAllowanceController.update);

// router.delete('/:id', employeeAllowanceController.destroy);

module.exports = router;
