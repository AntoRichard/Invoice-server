const path = require("path");
const { validationResult } = require("express-validator");
const Database = require(path.join(__dirname, "..", "database", "db"));
const userModel = require(path.join(__dirname, "..", "models", "User"));
const Hash = require(path.join(__dirname, "..", "helpers", "hash"));
const Token = require(path.join(__dirname, "..", "helpers", "token"));
const {
  internalServerProblem,
  successResponse,
  validationErrorResponse,
  unAuthenticatedResponse,
  noUserFoundResponse,
} = require(path.join(__dirname, "..", "helpers", "response"));
const { errorValidator } = require(path.join(
  "..",
  "validation",
  "errorValidator"
));

exports.signinPost = async (req, res) => {
  // Checking for user input errors
  const errors = validationResult(req);
  const error = errorValidator(errors);
  if (!error.success) {
    return validationErrorResponse(res, error);
  }
  const { email, password } = req.body;

  // Fetching user data
  const user = await Database.findByKey(userModel, { email });
  if (!user.success) {
    if (user.error) return internalServerProblem(res);
    return noUserFoundResponse(res);
  }

  // Password validation
  const result = await Hash.validatePassword(password, user.data.password);

  if (!result) {
    return unAuthenticatedResponse(res);
  }

  // Generate token
  const token = Token.genToken(user.data.id);
  return successResponse(res, 200, { token }, "login successful");
};
