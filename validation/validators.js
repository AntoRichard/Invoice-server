const { body } = require("express-validator");

const username = body("username").not().isEmpty().trim().escape().withMessage("Enter a valid username");
const email = body("email")
  .isEmail()
  .normalizeEmail()
  .withMessage("Enter a valid email");
const password = body("password").isLength({ min: 8 }).withMessage("password should me min length of 8");

const name = body("name").not().isEmpty().trim().escape().withMessage("Invoice name should not be empty");

const amount = body("amount").not().isEmpty().withMessage("Invoice amount should not be empty");

exports.signupValidators = [username, email, password];

exports.signinValidators = [email, password];

exports.invoiceValidators = [name, amount];
