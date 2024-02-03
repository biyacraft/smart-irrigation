// routes/devices.js
const express = require("express");
const router = express.Router();

// require controllers here
const {
  handleSensorData,
  getSensorReadings,
} = require("../controllers/sensorsController");
const { verifyToken } = require("../middlewares/verifyToken");
// GET /req

// send sensors data to store and analyze
router.post("/data", handleSensorData);
router.get("/data", getSensorReadings);

module.exports = router;
