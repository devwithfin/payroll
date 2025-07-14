// router/allowance
const express = require('express');
const router = express.Router();
const controller = require('../controllers/allowanceController');

router.get('/', controller.getAll);

module.exports = router;
