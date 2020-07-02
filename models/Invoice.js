const { Schema, model } = require("mongoose");

const InvoiceSchema = Schema({
  name: {
    type: String,
    reqired: true,
    trim: true,
  },
  amount: {
    type: Number,
    reqired: true,
    trim: true,
    default: 0,
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  updatedon: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("invoice", InvoiceSchema);
