const path = require("path");
const { endPointNotFound } = require(path.join(
  __dirname,
  "..",
  "helpers",
  "response"
));

exports.pageNotFound = (req, res) => {
  return endPointNotFound(res);
};
