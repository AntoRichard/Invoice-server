const { Schema, Model } = require("mongoose");

const UserSchema = Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    reqired: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    trim: true,
  },
  createdon: {
    type: Date,
    default: Date.now(),
  },
  updatedon: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Model("user", UserSchema);
