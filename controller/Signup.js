const { validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");
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
    return validationErrorResponse(res);
  }
  const { username, email, password } = req.body;
  
  // generate UUID
  const id = uuidv4();

  // Hash password
  const hashedPassword = await Hash.hashPassword(password);
  const newUser = {
    id,
    username,
    email,
    password: hashedPassword,
  };
  
  // Insert user into database
  const response = await Database.insert(userModel, newUser);
  if (!response.success) {
    return internalServerProblem(res, response.error);
  }

  // Generate Token
  const token = Token.genToken(id);
  return successResponse(res, 200, { token }, "user created successful");
};
