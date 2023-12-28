const mongoose = require("mongoose");
const { DB_URI } = require("./env.config");

// mongoose.set('useFindAndModify', false);
mongoose.set("strictQuery", false);

//DB_URI ---> mongodb://127.0.0.1:27017/huppTech
mongoose.connect(DB_URI, console.log("Connected to Database!", DB_URI));
