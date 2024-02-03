const mongoose = require("mongoose");
const microcontrollerSchema = mongoose.Schema({
  serial_number: {
    type: String,
    unique: true,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    default: "auto",
  },
});
const Microcontroller = mongoose.model(
  "Microcontroller",
  microcontrollerSchema
);
Microcontroller.createIndexes();
module.exports = Microcontroller;
