const { Router } = require("express");
const path = require("path");
const { Auth } = require(path.join(__dirname, "..", "middleware", "Auth"));
const { sortInvoiceGet, filterInvoiceGet } = require(path.join(
  __dirname,
  "..",
  "controller",
  "FilterInvoice"
));
const router = Router();

router.get("/invoice/sort", Auth, sortInvoiceGet);

router.get("/invoice/filter", Auth, filterInvoiceGet);

module.exports = router;
