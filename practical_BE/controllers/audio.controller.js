const {
  AUDIO_MESSAGES,
  COMMON_MESSAGES,
} = require("../constants/messages.constant");
const audioService = require("../services/audio.services");
const { BAD_REQUEST } = require("../constants/http-status-code.constant");
const apiHelper = require("../helpers/api.helper");
const { deleteImage } = require("../helpers/image.helper");

const createAudio = async (req, res) => {
  try {
    const { body, files } = req;
    const audioFile = files["song"][0];
    const imageFile = files["image"][0];
    body.image = imageFile.filename;
    body.song = audioFile.filename;
    let audio = await audioService.create(body);

    if (audio) {
      return apiHelper.success(res, AUDIO_MESSAGES.UPDATE, { audio });
    }
    return apiHelper.failure(
      res,
      COMMON_MESSAGES.UPDATE_ERROR,
      [],
      BAD_REQUEST
    );
  } catch (error) {
    return apiHelper.failure(res, error.message);
  }
};

const updateAudio = async (req, res) => {
  try {
    const { body, params, files } = req;
    if (files && files["song"]) {
      const audioFile = files["song"][0];
      body.song = audioFile.filename;
    }

    if (files && files["image"]) {
      const imageFile = files["image"][0];
      body.image = imageFile.filename;
    }

    let oldData;
    if ((files && files["song"]) || (files && files["image"])) {
      oldData = await audioService.get({ _id: params.id });
    }
    let audio = await audioService.update({ _id: params.id }, body);
    if (audio) {
      if (oldData && files && files["image"]) {
        await deleteImage(oldData.image);
      }
      if (oldData && files && files["song"]) {
        await deleteImage(oldData.song);
      }
      return apiHelper.success(res, AUDIO_MESSAGES.UPDATE, { audio });
    }
    return apiHelper.failure(
      res,
      COMMON_MESSAGES.UPDATE_ERROR,
      [],
      BAD_REQUEST
    );
  } catch (error) {
    return apiHelper.failure(res, error.message);
  }
};

const deleteAudio = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const audio = await audioService.remove({ _id });
    if (audio) {
      return apiHelper.success(res, AUDIO_MESSAGES.DELETE);
    }
    return apiHelper.failure(
      res,
      COMMON_MESSAGES.DELETE_ERROR,
      [],
      BAD_REQUEST
    );
  } catch (error) {
    req.logger.postLog("deleteAudio", error.message);
    return apiHelper.failure(res, error.message);
  }
};

const getAudio = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const audio = await audioService.get({ _id });
    if (audio && Object.keys(audio).length) {
      return apiHelper.success(res, AUDIO_MESSAGES.GET, { audio });
    }
    return apiHelper.success(res, COMMON_MESSAGES.GET_ERROR, { audio: {} });
  } catch (error) {
    req.logger.postLog("getAudio", error.message);
    return apiHelper.failure(res, error.message);
  }
};

const getAllAudio = async (req, res) => {
  try {
    const { query } = req;
    const audios = await audioService.getAll(query);
    if (audios && audios.audio.length) {
      return apiHelper.success(res, AUDIO_MESSAGES.GET_ALL, { audios });
    }
    return apiHelper.success(res, COMMON_MESSAGES.NO_DATA_FOUND, {
      audios: [],
    });
  } catch (error) {
    return apiHelper.failure(res, error.message);
  }
};

module.exports = {
  updateAudio,
  deleteAudio,
  createAudio,
  getAudio,
  getAllAudio,
};
