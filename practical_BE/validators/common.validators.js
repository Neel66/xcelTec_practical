const Joi = require("joi");

const idSchema = Joi.object().keys({
  id: Joi.string().length(24).required(),
});

const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = {
  idSchema,
  emailValidation,
};
