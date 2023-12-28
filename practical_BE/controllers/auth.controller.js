const apiHelper = require("../helpers/api.helper");
const userService = require("../services/user.services");
const { BAD_REQUEST } = require("../constants/http-status-code.constant");
const { AUTH_MESSAGES } = require("../constants/messages.constant");

const login = async (req, res) => {
  try {
    const { body } = req;
    const userData = await userService.get({ email: body?.email });
    if (userData) {
      console.log("body :>> ", body);
      const validUser = await userData.comparePassword(body.password);
      if (validUser) {
        return apiHelper.success(res, AUTH_MESSAGES.LOGIN, {
          accessToken: userData.generateJWT(),
          user: userData.toJson(),
        });
      }
      return apiHelper.failure(
        res,
        AUTH_MESSAGES.PASSWORD_ERROR,
        [],
        BAD_REQUEST
      );
    }
    console.log("object :>> ");
    return apiHelper.failure(res, AUTH_MESSAGES.NOT_REGISTER, [], BAD_REQUEST);
  } catch (error) {
    return apiHelper.failure(res, error.message);
  }
};

module.exports = {
  login,
};
