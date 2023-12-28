const Joi = require("joi");
const { AUTH_MESSAGES } = require("../constants/messages.constant");

const loginSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6).max(15).message({
    "string.pattern.base": AUTH_MESSAGES.PASSWORD_PATTERN,
  }),
});

module.exports = {
  loginSchema,
};
