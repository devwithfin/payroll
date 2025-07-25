// routes/account
const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController");

const verifyToken = require("../middlewares/verifyToken");
const allowedRole = require("../middlewares/roleMiddleware"); 

router.get("/", verifyToken, allowedRole("HR"), accountController.getAllAccounts);

router.put("/:id_user", verifyToken, accountController.updatePassword);

module.exports = router;
