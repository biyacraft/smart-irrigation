const mongoose = require("mongoose");

const sensorDataSchema = mongoose.Schema({
  sensor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sensor",
    required: true,
  },
  reading: {
    type: Number,
    required: true,
  },
  readingTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("SensorReading", sensorDataSchema);
