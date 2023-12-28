const mongoose = require("mongoose");
const { AUDIO } = require("../configs/models.configs");
const Schema = mongoose.Schema;

const audioSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 50,
    min: 2,
  },
  description: {
    type: String,
    required: true,
  },
  song: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

audioSchema.set("timestamps", true);

module.exports = mongoose.model(AUDIO, audioSchema);
