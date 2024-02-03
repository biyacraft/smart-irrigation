const jwt = require("jsonwebtoken");
const Notification = require("../models/notification"); // Assuming you have a Notification model defined
const notificationService = require("../services/NotificationService");

exports.getUnreadNotifications = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const { serial_number } = jwt.verify(token, process.env.JWT_SECRET);
    // Call the service to fetch unread notifications based on the serial number
    const unreadNotifications =
      await notificationService.getLatestUnreadNotifications(serial_number);

    // Send the unread notifications as the response
    res.json({ notifications: unreadNotifications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
