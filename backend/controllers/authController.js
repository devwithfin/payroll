const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");
require("dotenv").config();

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Username and Password required" });
    }

    const [rows] = await db.execute(
      `SELECT u.id, u.username, u.password_hash, r.name AS role_name
       FROM users AS u
       INNER JOIN roles AS r ON r.id = u.role_id
       WHERE u.username = ?`,
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = rows[0];

    if (!user.password_hash) {
      return res.status(500).json({ message: "User password not found" });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Successfully login",
      token,
      id: user.id,
      username: user.username,
      role_name: user.role_name,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: "Logout success" });
};

exports.getProfile = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT u.username, r.name AS role_name, u.updated_at
       FROM users AS u
       JOIN roles AS r ON u.role_id = r.id
       WHERE u.id = ?`,
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
