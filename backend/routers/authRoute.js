// routes/auth
const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");

router.post("/login", authController.login);

router.get("/profile", verifyToken, authController.profile);

router.post("/logout", verifyToken, authController.logout);

module.exports = router;
