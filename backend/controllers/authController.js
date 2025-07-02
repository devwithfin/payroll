// controllers/auth

// connection database
const db = require("../config/db");
// token jwt
const jwt = require("jsonwebtoken");
// encrypt pass with bcrypt
const bcrypt = require("bcrypt");

require("dotenv").config();

// controller login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // validate empty input
    if (!username || !password) {
      return res.status(400).json({ message: "Username and Password required" });
    }
    // get data user by username
    const [rows] = await db.execute(
      `SELECT u.id, u.username, u.password_hash, r.name AS role_name
       FROM users AS u
       INNER JOIN roles AS r ON r.id = u.role_id
       WHERE u.username = ?`,
      [username]
    );

    // if user not found
    if (rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = rows[0];

    // if is there a pass hash
    if (!user.password_hash) {
      return res.status(500).json({ message: "User password not found" });
    }

    // compare input pass with hash pass in database
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // make jwt token for auth
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" } // exp token
    );

    // res success login
    res.status(200).json({
      message: "Successfully login",
      token,  // info token
    });
  } catch (err) {
    // res err login
    console.error(err.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller logout
exports.logout = (req, res) => {
  res.status(200).json({ message: "Logout success" });
};

// controller get profile user by token id
exports.getProfile = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT u.username, r.name AS role_name, u.updated_at
       FROM users AS u
       JOIN roles AS r ON u.role_id = r.id
       WHERE u.id = ?`,
      [req.user.id] // get id user from middleware/auth
    );

    // if user not found
    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // send profile data
    res.status(200).json(rows[0]);
  } catch (err) {
    console.error("Get profile error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
