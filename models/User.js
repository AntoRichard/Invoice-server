const { Schema, model } = require("mongoose");
const validator = require("validator");

const UserSchema = Schema({
  username: {
    type: String,
    reqired: true,
    trim: true,
  },
  email: {
    type: String,
    // unique: true,
    required: true,
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
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("user", UserSchema);
