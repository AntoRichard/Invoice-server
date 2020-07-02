const jwt = require("jsonwebtoken");
const path = require("path");
const { SECRET } = require(path.join(__dirname, "env"))

class Token {
  static genToken(id) {
    const token = jwt.sign(id, SECRET);
    return token;
  }
}

module.exports = Token;