const jwt = require("jsonwebtoken");
const { SECRET } = require("./env")

class Token {
  static genToken(id) {
    const token = jwt.sign(id, SECRET);
    return token;
  }
}

module.exports = Token;