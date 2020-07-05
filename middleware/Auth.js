const jwt = require("jsonwebtoken");
const path = require("path");
const Database = require(path.join(__dirname, "..", "database", "db"));
const UserModel = require(path.join(__dirname, "..", "models", "User"));
const { SECRET } = require(path.join(__dirname, "..", "helpers", "env"));
const {
  unAuthorizedResponse,
} = require(path.join(__dirname, "..", "helpers", "response"));

exports.Auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, SECRET);
    const user = await Database.findByKey(UserModel, { _id: decoded });
    req.user = {
      id: decoded,
      isAdmin: user.data.isAdmin,
      username: user.data.username
    };
    next();
  } catch (err) {
    return unAuthorizedResponse(res);
  }
};
