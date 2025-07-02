// middlewares/auth
const jwt = require("jsonwebtoken");
require("dotenv").config();

// verify token jwt by header auth
function authenticateToken(req, res, next) {
  // get token from header auth
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  // if token not found, access denied
  if (!token) return res.sendStatus(401);

  // verify token with .env
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    // save req data to req object
    req.user = user;
    next();
  });
}

module.exports = { authenticateToken };
