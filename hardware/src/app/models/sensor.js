const mongoose = require("mongoose");
const sensorSchema = mongoose.Schema({
  serial_number: {
    type: String,
    required: true,
  },
  sensing_type: {
    type: String,
    require: true,
  },
});
module.exports = mongoose.model("Sensor", sensorSchema);
