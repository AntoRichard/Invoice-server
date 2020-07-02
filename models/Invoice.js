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
    default: new Date().toISOString(),
  },
  updatedon: {
    type: Date,
    default: new Date().toISOString(),
  },
});

module.exports = model("invoice", InvoiceSchema);
