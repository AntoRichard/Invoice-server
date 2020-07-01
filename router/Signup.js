const path = require("path");
const { Router } = require("express");
const { signupValidators } = require(path.join(
  __dirname,
  "..",
  "validation",
  "validators"
));
const { signupPost } = require(path.join(
  __dirname,
  "..",
  "controller",
  "Signup"
));
const router = Router();

router.post("/signup", signupValidators, signupPost);

module.exports = router;
