const Joi = require("joi");
// validation

const validation = require("./validation_schema");

async function validateRegistration(data) {
  const { error } = validation.registrationSchema.validate(data, {
    abortEarly: false,
  });
  return error;
}
async function validateLogin(data) {
  const { error } = validation.loginSchema.validate(data, {
    abortEarly: false,
  });
  return error;
}
async function validateSensorReading(data) {
  const { error } = validation.sensorReadingSchema.validate(data, {
    abortEarly: false,
  });
  return error;
}

module.exports = {
  validateRegistration,
  validateLogin,
  validateSensorReading,
};
