// router/account
const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

router.get("/", accountController.getAllAccounts);
router.put("/:id_user", accountController.updatePassword);

module.exports = router;
