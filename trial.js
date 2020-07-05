const mongoose = require("mongoose");
const path = require("path");
const { DATABASE_URL } = require(path.join(__dirname, "..", "helpers", "env"));
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

const connect = () =>
  new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "Test") {
      const Mockgoose = require("mockgoose").Mockgoose;
      const mockgoose = new Mockgoose(mongoose);
      mockgoose.prepareStorage().then(() => {
        mongoose.connect(DATABASE_URL, dbOptions).then((res, err) => {
          console.log("TEST");
          if (err) return reject(err);
          resolve();
        });
      });
    } else {
      mongoose.connect(DATABASE_URL, dbOptions).then((res, err) => {
        if (err) return reject(err);
        resolve();
      });
    }
  });

const close = () => {
  return mongoose.connect();
};

module.exports = { connect, close };
