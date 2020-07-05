const mongoose = require("mongoose");
const path = require("path");
const { DATABASE_URL } = require(path.join(__dirname, "..", "helpers", "env"));
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

exports.connect = () =>
  new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === true) {
      const { Mockgoose } = require("mockgoose");
      const mockgoose = new Mockgoose(mongoose);
      mockgoose.prepareStorage().then(() => {
        mongoose.connect("mongodb://localhost/test", dbOptions).then((res, err) => {
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

exports.close = () => mongoose.disconnect();
