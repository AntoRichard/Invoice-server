const jwt = require("jsonwebtoken");
const Database = require("../database/db");
const UserModel = require("../models/User");
const { SECRET } = require("../helpers/env");
const { unAuthorizedResponse } = require("../helpers/response");

exports.Auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, SECRET);
    const user = await Database.findByKey(UserModel, { _id: decoded });
    req.user = {
      id: decoded,
      isAdmin: user.data.isAdmin,
    };
    next();
  } catch (err) {
    return unAuthorizedResponse(res);
  }
};
