const mongoose = require("mongoose");
const logsSchema = mongoose.Schema({
  serial_number: {
    type: String,
    ref: microcontrollers,
  },

  log_detail: [
    {
      type: String,
      default: "",
    },
  ],
  log_date: {
    type: Date,
    default: Date.now,
  },
});
exports.Logs = mongoose.model("Logs", logsSchema);
