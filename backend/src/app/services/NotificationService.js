// // services/notificationService.js

const { Notification } = require("../models/notification");

// // Function to retrieve the latest unread notifications for a user
exports.getLatestUnreadNotifications = async (serial_number) => {
  try {
    // Fetch unread notifications from the database based on the serial number
    console.log(serial_number);
    const unreadNotifications = await Notification.find({
      serial_number: serial_number,
      read: "unread",
    })
      .sort({ readingTime: -1 })
      .limit(10);
    const notificationIds = unreadNotifications.map(
      (notification) => notification._id
    );
    await Notification.updateMany(
      { _id: { $in: notificationIds } },
      { $set: { read: "read" } }
    );
    return unreadNotifications;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch unread notifications");
  }
};
