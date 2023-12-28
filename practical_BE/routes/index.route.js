const express = require("express");
const router = express.Router();

router.use("/auth", require("./api/auth.route"));
router.use("/audio", require("./api/audio.route"));

module.exports = router;
