const { Router } = require("express");
const path = require("path");
const { Auth } = require("../middleware/Auth");
const { invoiceValidators } = require(path.join(
  __dirname,
  "..",
  "validation",
  "validators"
));
const { invoiceGet, invoicePost } = require(path.join(
  __dirname,
  "..",
  "controller",
  "Invoice"
));
const router = Router();

router.get("/invoice", Auth, invoiceGet);

router.post("/invoice", [Auth, invoiceValidators], invoicePost);

module.exports = router;
