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
  invoicePost,
  invoicePatch,
  invoiceDelete,
} = require(path.join(__dirname, "..", "controller", "Invoice"));

const router = Router();

router.get("/invoice", Auth, invoiceGet);

router.post("/invoice", [Auth, invoiceValidators], invoicePost);

router.patch("/invoice", Auth, invoicePatch);

router.delete("/invoice/:id", Auth, invoiceDelete);

module.exports = router;
