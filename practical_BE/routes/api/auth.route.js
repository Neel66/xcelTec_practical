const express = require("express");
const router = express.Router();
const { login } = require("../../controllers/auth.controller");
const { loginSchema } = require("../../validators/auth.validators");
const requestValidatorMiddleware = require("../../middlewares/request-validator.middleware");
const { BODY } = require("../../constants/request-properties.constant");

router.post("/login", requestValidatorMiddleware([loginSchema], [BODY]), login);

module.exports = router;
