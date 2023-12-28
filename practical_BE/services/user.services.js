const User = require("../models/user.model");

const get = async (query) => {
  try {
    return await User.findOne(query);
  } catch (error) {
    throw Error(error);
  }
};

module.exports = { get };
