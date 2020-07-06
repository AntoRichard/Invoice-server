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

router.get("/api/v1/invoice/:invoiceid", Auth, invoiceGetOne);

router.get("/api/v1/invoice", Auth, invoiceGet);

router.post("/api/v1/invoice", [Auth, invoiceValidators], invoicePost);

router.patch("/api/v1/invoice", [Auth, invoiceValidators], invoicePatch);

router.delete("/api/v1/invoice/:id", Auth, invoiceDelete);

module.exports = router;
