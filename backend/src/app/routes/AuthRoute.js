const express = require("express");
const router = express.Router();
const {
  handleRegistration,
  handleLogin,
} = require("../controllers/AuthController");
router.get("/register", (req, res) =>
  res.send("hello there it is just test message")
);
router.post("/register", handleRegistration);
router.post("/login", handleLogin);
router.post("/reset");
module.exports = router;
