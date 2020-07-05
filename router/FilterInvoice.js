const { Router } = require("express");
const path = require("path");
const { Auth } = require(path.join(__dirname, "..", "middleware", "Auth"));
const { sortInvoiceGet, filterInvoiceGet, filterAndSortInvoiceGet } = require(path.join(
  __dirname,
  "..",
  "controller",
  "FilterInvoice"
));
const router = Router();

router.get("/invoices/sort", Auth, sortInvoiceGet);

router.get("/invoices/filter", Auth, filterInvoiceGet);

router.get("/invoices", Auth, filterAndSortInvoiceGet);

module.exports = router;
