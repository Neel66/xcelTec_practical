const Joi = require("joi");
const { AUDIO_MESSAGES } = require("../constants/messages.constant");

const updateAudioSchema = Joi.object().keys({
  description: Joi.string().optional(),
  name: Joi.string().optional().min(2).max(50).message({
    "string.pattern.base": AUDIO_MESSAGES.NAME_PATTERN,
  }),
  song: Joi.string().optional(),
  image: Joi.string().optional(),
});

const createAudioSchema = Joi.object().keys({
  description: Joi.string().required(),
  name: Joi.string().required().min(2).max(50).message({
    "string.pattern.base": AUDIO_MESSAGES.NAME_PATTERN,
  }),
});

const getAllAudiosSchema = Joi.object().keys({
  page: Joi.number().greater(0),
  pageSize: Joi.number()
    .max(1000)
    .when("pageNumber", {
      is: Joi.number().exist(),
      then: Joi.number().greater(0).max(1000).required(),
    }),
  sortOrder: Joi.string().optional(),
  sortColumn: Joi.string().optional(),
});

module.exports = {
  updateAudioSchema,
  createAudioSchema,
  getAllAudiosSchema,
};
