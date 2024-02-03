const mongoose = require("mongoose");
const ml_predictionSchema = mongoose.Schema({
  model_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ml_feedback,
  },
  reading_id: {
    type: String,
    require: true,
  },
  prediction: {
    type: String,
    require: true,
  },
  prediction_time: {
    type: Date,
    default: Date.now,
  },
});
exports.Prediction = mongoose.model("Prediction", ml_predictionSchema);
