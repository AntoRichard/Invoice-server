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

router.post("/api/v1/signin", signinValidators, signinPost);

module.exports = router;
