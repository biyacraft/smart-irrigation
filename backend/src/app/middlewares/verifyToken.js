require("dotenv").config();
const jwt = require("jsonwebtoken");

// Middleware for token verification
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.serial_number = decoded.serial_number;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
