const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  updateAudio,
  deleteAudio,
  createAudio,
  getAudio,
  getAllAudio,
} = require("../../controllers/audio.controller");
const {
  updateAudioSchema,
  createAudioSchema,
  getAllAudiosSchema,
} = require("../../validators/audio.validators");
const { idSchema } = require("../../validators/common.validators");
const requestValidatorMiddleware = require("../../middlewares/request-validator.middleware");
const {
  BODY,
  PARAMS,
  QUERY,
} = require("../../constants/request-properties.constant");
const path = require("path");

//image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `public/audio`);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.put(
  "/:id",
  upload.fields([
    { name: "song", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  requestValidatorMiddleware([idSchema, updateAudioSchema], [PARAMS, BODY]),
  updateAudio
);

router.post(
  "/",
  upload.fields([
    { name: "song", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  requestValidatorMiddleware([createAudioSchema], [BODY]),
  createAudio
);

router.delete(
  "/:id/delete",
  requestValidatorMiddleware([idSchema], [PARAMS]),
  deleteAudio
);

router.get(
  "/",
  requestValidatorMiddleware([getAllAudiosSchema], [QUERY]),
  getAllAudio
);

module.exports = router;
