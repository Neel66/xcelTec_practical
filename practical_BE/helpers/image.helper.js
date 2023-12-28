const fs = require("fs");
const path = require("path");
const {
  PUBLIC_DIR,
  AUDIO_IMAGES,
} = require("../constants/file-directories.constant");
let publicFolderPath = path.join(__dirname, `../${PUBLIC_DIR}/${AUDIO_IMAGES}`);

const deleteImage = (fileName) => {
  const filePath = path.join(publicFolderPath, fileName);
  fs.unlink(filePath, (err) => {
    if (err) {
      return;
    }
  });
};

module.exports = {
  deleteImage,
};
