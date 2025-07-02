// routers/auth
const express = require("express");
const router = express.Router();

// import controllers/auth
const authController = require("../controllers/authController");
// import middlewares/auth to verify jwt token
const { authenticateToken } = require("../middlewares/authMiddleware");

// login route
router.post("/login", authController.login);

// logout route
router.post("/logout", authController.logout);

// get profile of logged-in user route
router.get("/profile", authenticateToken, authController.getProfile);

module.exports = router;
