// Validation
const joi = require("@hapi/joi");

const registerValidation = (body) => {
  const schema = joi.object({
    name: joi.string().required(),
    lastname: joi.string().required(),
    email: joi.string().required().email(),
    password: joi.string().min(6).required(),
    city: joi.string().required(),
  });

  return schema.validate(body);
};

const loginValidation = (body) => {
  const schema = joi.object({
    email: joi.string().required().email(),
    password: joi.string().min(6).required(),
  });

  return schema.validate(body);
};

module.exports = {
  registerValidation,
  loginValidation,
};
