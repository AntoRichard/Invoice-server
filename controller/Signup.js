const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
const userModel = require("../models/User");
const Hash = require("../helpers/hash");
const Database = require("../database/db");
const Token = require("../helpers/token");

exports.signupPost = async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const errors = {};
    for (let error of err.array()) {
      errors[error.param] = error.msg;
    }
    return res.status(422).json({ errors, success: false });
  }
  const { username, email, password } = req.body;
  const id = uuidv4();
  const hashedPassword = await Hash.hashPassword(password);
  const newUser = {
    id,
    username,
    email,
    password: hashedPassword,
  };
  const response = await Database.insert(userModel, newUser);
  if (!response.success) {
    return res.status(500).json({
      success: false,
      message: "Internal server problem",
      error: response.error,
    });
  }
  const token = Token.genToken(id);
  return res.status(200).json({
    success: true,
    message: "user created successful",
    token,
  });
};
