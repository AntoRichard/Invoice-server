const { Router } = require("express");
const path = require("path");
const { Auth } = require(path.join(__dirname, "..", "middleware", "Auth"));
const { invoiceValidators } = require(path.join(
  __dirname,
  "..",
  "validation",
  "validators"
));
const {
  invoiceGet,
  invoiceGetOne,
  invoicePost,
  invoicePatch,
  invoiceDelete,
} = require(path.join(__dirname, "..", "controller", "Invoice"));

const router = Router();

router.get("/invoice/:invoiceid", Auth, invoiceGetOne);

router.get("/invoice", Auth, invoiceGet);

router.post("/invoice", [Auth, invoiceValidators], invoicePost);

router.patch("/invoice", [Auth, invoiceValidators], invoicePatch);

router.delete("/invoice/:id", Auth, invoiceDelete);

module.exports = router;
