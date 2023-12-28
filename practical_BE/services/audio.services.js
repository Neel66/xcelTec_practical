const Audio = require("../models/audio.model");

const get = async (query) => {
  try {
    return await Audio.findOne(query);
  } catch (error) {
    throw Error(error);
  }
};

const create = async (body) => {
  try {
    const audio = new Audio(body);
    return await audio.save();
  } catch (error) {
    throw Error(error);
  }
};

const remove = async (query) => {
  try {
    return await Audio.deleteOne(query);
  } catch (error) {
    throw Error(error);
  }
};

const update = async (query, body) => {
  try {
    return await Audio.findOneAndUpdate(query, body);
  } catch (error) {
    throw Error(error);
  }
};

const getAll = async (query) => {
  try {
    let { pageNumber = 1, pageSize = 10, sortColumn = "createdAt" } = query;
    let sort = {};
    sort[sortColumn] = -1;
    const totalAudio = await Audio.countDocuments();
    const audio = await Audio.find()
      .sort(sort)
      .skip((pageNumber - 1) * pageSize)
      .limit(parseInt(pageSize))
      .select({
        __v: 0,
      });
    return { totalAudio, audio };
  } catch (error) {
    throw Error(error);
  }
};
module.exports = { get, create, update, remove, getAll };
