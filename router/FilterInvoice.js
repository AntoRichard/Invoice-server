const { Router } = require("express");
const path = require("path");
const { Auth } = require(path.join(__dirname, "..", "middleware", "Auth"));
const { filterInvoiceGet } = require(path.join(
  __dirname,
  "..",
  "controller",
  "FilterInvoice"
));
const router = Router();

router.get("/filter", Auth, filterInvoiceGet);

module.exports = router;
