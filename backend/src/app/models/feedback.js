const mongoose = require("mongoose");
const feedbackSchema = mongoose.Schema({
  prediction_id: {
    type: String,
    require: true,
  },
  true_value: {
    type: Boolean,
  },
  feedback_time: {
    type: Date,
    default: Date.now,
  },
});
exports.Feedback = mongoose.model("Feedback", feedbackSchema);
