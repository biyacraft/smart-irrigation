require("dotenv").config();

const mongoose = require("mongoose");

const uri = process.env.DB;

const db = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};

module.exports = db;
