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
    console.log("[MONGODB]: CONNECTED TO DATABASE");
  } catch (error) {
    console.log(error.message);
    console.log("[MONGODB]: FAILED TO CONNECT WITH DATABASE");
    return process.exit();
  }
};
