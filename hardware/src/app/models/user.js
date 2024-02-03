const { string } = require("joi");
const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
  },

  phone_number: {
    type: Number,
    unique: true,
    require: true,
  },
  serial_number: {
    type: String,
    unique: [true, "already registered with this serial number "],
  },
  password: {
    type: String,
    require: true,
  },
});
const User = mongoose.model("User", userSchema);
User.createIndexes();

module.exports = User;
