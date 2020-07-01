const { validationResult } = require("express-validator");

exports.signupPost = (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const errors = {};
    for (let error of err.array()) {
      errors[error.param] = error.msg;
    }
    return res.status(422).json({ errors, success: false });
  }
  console.log(req.body, err);
  return res.json({
    msg: true,
  });
};
