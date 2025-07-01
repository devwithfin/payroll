const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middlewares/authMiddleware");

// Login route
router.post("/login", authController.login);

// Logout route
router.post("/logout", authController.logout);

// Get profile of logged-in user
router.get("/profile", authenticateToken, authController.getProfile);

module.exports = router;
