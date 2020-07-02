const mongoose = require("mongoose");
const path = require("path");
const { DATABASE_URL } = require(path.join(__dirname, "..", "helpers", "env"));

exports.databaseConnection = async () => {
  const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  };
  try {
    await mongoose.connect(DATABASE_URL, dbOptions);
    console.log("Connected to database . . . .");
  } catch (error) {
    console.log(error.message);
    console.log("Database cannot be connected.");
    return process.exit();
  }
};
