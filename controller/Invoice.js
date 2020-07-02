const { validationResult } = require("express-validator");
const Database = require("../database/db");
const InvoiceModel = require("../models/Invoice");
const path = require("path");
const { errorValidator } = require(path.join(
  "..",
  "validation",
  "errorValidator"
));

const {
  internalServerProblem,
  successResponse,
  validationErrorResponse,
} = require(path.join(__dirname, "..", "helpers", "response"));

exports.invoiceGet = async (req, res) => {
  const { id, isAdmin } = req.user;
  let response;
  if(isAdmin) {
    response = await Database.findAll(InvoiceModel, { userid: id });
  } else {
    response = await Database.findAllByKey(InvoiceModel, { userid: id });
  }
  if (!response.success) {
    return internalServerProblem(res, response.error);
  }
  return successResponse(res, 200, response, "invoice found");
};

exports.invoicePost = async (req, res) => {
  const errors = validationResult(req);
  const error = errorValidator(errors);
  if (!error.success) {
    return validationErrorResponse(res, error);
  }
  const { name, amount } = req.body;
  const newInvoice = {
    name,
    amount,
    userid: req.user.id,
  };
  const response = await Database.insert(InvoiceModel, newInvoice);
  if (!response.success) {
    return internalServerProblem(res, response.error);
  }
  return successResponse(res, 200, {}, "Invoice added.");
};
