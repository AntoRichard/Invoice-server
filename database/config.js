const mongoose = require("mongoose");

exports.databaseConnection = async () => {
  const url =
    "mongodb+srv://anto:abcd@1234@data.eizjb.mongodb.net/InvoiceApp?retryWrites=true&w=majority";
  const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(url, dbOptions);
    console.log("Connected to database . . . .");
  } catch (error) {
    console.log(error.message);
    console.log("Database cannot be connected.");
    return process.exit();
  }
};
