const mongoose = require("mongoose");
const notificationSchema = mongoose.Schema({
  serial_number: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    default: "",
  },
  timestamp: { type: Date, default: Date.now },
  read: { type: String, default: "unread" },
});
exports.Notification = mongoose.model("Notification", notificationSchema);

// // Function to mark a notification as read
// exports.markNotificationAsRead = async (notificationId) => {
//   try {
//     await Notification.findByIdAndUpdate(notificationId, { read: "read" });
//   } catch (error) {
//     throw new Error("Failed to mark notification as read.");
//   }
// };
