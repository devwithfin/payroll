// controller/auth
"use strict";

const { User, Employee } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({
        where: { username },
        include: [
          {
            model: Employee,
            as: "employee",
            attributes: ["full_name", "email"],
          },
        ],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(401)
          .json({ message: "Username or password is incorrect" });
      }

      const payload = { id_user: user.id_user, role: user.role };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          id_user: user.id_user,
          username: user.username,
          role: user.role,
          full_name: user.employee?.full_name || null,
          email: user.employee?.email || null,
        },
      });
    } catch (err) {
      console.error("Login error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  profile: async (req, res) => {
    try {
      const user = await User.findOne({
        where: { id_user: req.user.id_user },
        attributes: ["id_user", "username", "role"],
        include: [
          {
            model: Employee,
            as: "employee",
            attributes: ["full_name", "email"],
          },
        ],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({
        message: "User profile fetched successfully",
        user,
      });
    } catch (err) {
      console.error("Profile error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  logout: async (req, res) => {
    try {
      console.log(`User ${req.user.id_user} logged out`);
      return res.status(200).json({ message: "Successfully logged out" });
    } catch (error) {
      console.error("Logout error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  },
};
