const path = require("path");
const { Router } = require("express");
const { signupValidator } = require(path.join(
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

router.post("/signup", signupValidator, signupPost);

module.exports = router;
