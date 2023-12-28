const mongoose = require("mongoose");
const { USER } = require("../configs/models.configs");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const { AUTH_MESSAGES } = require("../constants/messages.constant");
const { emailValidation } = require("../validators/common.validators");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    max: 50,
    min: 2,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: (value) => {
        return emailValidation.test(value);
      },
      message: AUTH_MESSAGES.INVALID_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.set("timestamps", true);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, 10);
};

userSchema.methods.comparePassword = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

module.exports = mongoose.model(USER, userSchema);
