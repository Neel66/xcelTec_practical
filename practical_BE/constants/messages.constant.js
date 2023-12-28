const COMMON_MESSAGES = {
  ROUTE_NOT_EXISTS: "Requested route does not exists!",
  VALIDATION_ERROR: "Data validation failed!",
  UNKNOWN_ERROR: "Something went wrong, please try again later!",
  NO_DATA_FOUND: "No data found!",
  DATA_RETRIEVED: "Data retrieved successfully.",
  CREATE_ERROR: "Unable to create a resource.",
  UPDATE_ERROR: "Unable to update a resource.",
  DELETE_ERROR: "Unable to delete a resource.",
  GET_ERROR: "Unable to fetch requested resource.",
  IMAGE_FORMAT_REQUIRED: "Image formate does not valid",
};

const AUTH_MESSAGES = {
  PASSWORD_PATTERN: "A Minimum of six characters password allowed",
  LOGIN: "User login successfully",
  PASSWORD_ERROR: "Please enter valid password",
  INVALID_EMAIL: "Invalid email",
  EMAIL_ALREADY_REGISTER: "Email already register. Please login",
  NOT_REGISTER: "Please register!",
};

const AUDIO_MESSAGES = {
  NAME_PATTERN:
    "A Minimum of three characters and maximum fifty characters name allowed",
  UPDATE: "Audio update successfully.",
  DELETE: "Audio delete successfully.",
  GET_ALL: "Data successfully get.",
};

const JWT_MESSAGES = {
  UNAUTHORIZED_ACCESS_TOKEN: "Unauthorized access token!",
  FORBIDDEN_ACCESS: "403 Error! forbidden access!",
};
module.exports = {
  COMMON_MESSAGES,
  AUTH_MESSAGES,
  AUDIO_MESSAGES,
  JWT_MESSAGES,
};
