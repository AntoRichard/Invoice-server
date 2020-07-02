const { validationResult } = require("express-validator");
const path = require("path");
const userModel = require(path.join(__dirname, "..", "models", "User"));
const Hash = require(path.join(__dirname, "..", "helpers", "hash"));
const Database = require(path.join(__dirname, "..", "database", "db"));
const Token = require(path.join(__dirname, "..", "helpers", "token"));
const { errorValidator } = require(path.join(
  "..",
  "validation",
  "errorValidator"
));
const {
  internalServerProblem,
  successResponse,
  validationErrorResponse,
} = require(path.join(__dirname, "..", "helpers", "response"));

exports.signupPost = async (req, res) => {
  // Checks for user input validation
  const errors = validationResult(req);
  const error = errorValidator(errors);
  if (!error.success) {
    return validationErrorResponse(res, "Enter a valid Email or password");
  }
  const { username, email, password } = req.body;

  // Hash password
  const hashedPassword = await Hash.hashPassword(password);
  const newUser = {
    username,
    email,
    password: hashedPassword,
  };

  // Insert user into database
  const response = await Database.insert(userModel, newUser);
  console.log({ response });
  if (!response.success) {
    return internalServerProblem(res, response.error);
  }

  // Generate Token
  const token = Token.genToken(response.data._id.toString());
  return successResponse(res, 200, { token }, "user created successful");
};
