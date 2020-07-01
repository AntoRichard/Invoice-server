const { Router } = require("express");
const path = require("path");
const { signinPost } = require(path.join(
  __dirname,
  "..",
  "controller",
  "Signin"
));
const { signinValidators } = require(path.join(
  __dirname,
  "..",
  "validation",
  "validators"
));
const router = Router();

router.post("/signin", signinValidators, signinPost);

module.exports = router;
