const { body } = require("express-validator");

const username = body("username").not().isEmpty().trim().escape();
const email = body("email").isEmail().normalizeEmail().withMessage("Enter a valid email");
const password = body("password").isLength({ min: 8 })

exports.signupValidator = [username, email, password]
