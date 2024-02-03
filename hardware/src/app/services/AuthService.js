// services/AuthService
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const microcontroller = require("../models/microcontroller");
const User = require("../models/user");
const Microcontroller = require("../models/microcontroller");
const Sensor = require("../models/sensor");
// Store user and microcontroller data in the database
exports.register = async (userData, microcontrollerData) => {
  try {
    //add some validation here

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    //creating user
    const user = new User(userData);
    user.password = hashedPassword;

    const mcc = new Microcontroller(microcontrollerData);
    const sensor1 = new Sensor({
      serial_number: microcontrollerData.serial_number,
      sensing_type: "moisture",
    });
    const sensor2 = new Sensor({
      serial_number: microcontrollerData.serial_number,
      sensing_type: "temperature",
    });
    const sensor3 = new Sensor({
      serial_number: microcontrollerData.serial_number,
      sensing_type: "humidity",
    });

    await mcc.save();
    await user.save();
    await sensor1.save();
    await sensor2.save();
    await sensor3.save();
    return [user, mcc, sensor1, sensor2, sensor3];
  } catch (regError) {
    return regError;
  }
};

//login api implementation

exports.login = async (loginData) => {
  // Find the user by serial number in the database
  const user = await User.findOne({ serial_number: loginData.serial_number });

  // If user not found, throw an error
  if (!user || user === null) {
    throw new Error("This user doesn't exist");
  }

  // Compare the provided password with the stored hashed password
  const isPasswordValid = await bcrypt.compare(
    loginData.password,
    user.password
  );

  // If passwords do not match, throw an error
  if (!isPasswordValid) {
    throw new Error("Incorrect credentials");
  }

  // Generate a JSON Web Token (JWT)
  const token = jwt.sign(
    { serial_number: user.serial_number },
    process.env.JWT_SECRET
  );

  return token;
};
