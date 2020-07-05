const { validationResult } = require("express-validator");
const path = require("path");
const Database = require(path.join(__dirname, "..", "database", "db"));
const InvoiceModel = require(path.join(__dirname, "..", "models", "Invoice"));
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
  if (isAdmin) {
    response = await Database.findAll(InvoiceModel, { userid: id });
  } else {
    response = await Database.findAllByKey(InvoiceModel, { userid: id });
  }
  if (!response.success) {
    return internalServerProblem(res, response.error);
  }
  return successResponse(res, 200, response, "invoice found");
};

exports.invoiceGetOne = async (req, res) => {
  const { id } = req.user;
  const _id = req.params.invoiceid;
  let response;
  response = await Database.findAllByKey(InvoiceModel, { _id, userid: id });

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
  const { name, amount, date } = req.body;
  const newInvoice = {
    name,
    amount,
    date,
    userid: req.user.id,
  };
  const response = await Database.insert(InvoiceModel, newInvoice);
  if (!response.success) {
    return internalServerProblem(res, response.error);
  }
  return successResponse(res, 200, {}, "Invoice added.");
};

exports.invoicePatch = async (req, res) => {
  const errors = validationResult(req);
  const error = errorValidator(errors);
  if (!error.success) {
    return validationErrorResponse(res, error);
  }
  const id = req.body.id;
  const name = req.body.name;
  const amount = req.body.amount;
  const update = {
    updatedon: Date.now(),
  };
  if(!id) return validationErrorResponse(res, { error: "required id to update invoice" });
  if (name) {
    update.name = name;
  }
  if (amount) {
    update.amount = amount;
  }
  const response = await Database.findOneAndUpdate(
    InvoiceModel,
    { _id: id, userid: req.user.id },
    update
  );
  if (!response.success) {
    return internalServerProblem(res, response.error);
  }
  return successResponse(res, 201, {}, "Invoice updated successfully.");
};

exports.invoiceDelete = async (req, res) => {
  const id = req.params.id;
  const response = await Database.findOneAndDelete(InvoiceModel, {
    _id: id,
    userid: req.user.id,
  });
  console.log({ response });
  if (!response.success) {
    return internalServerProblem(res, response.error);
  }
  return successResponse(res, 200, {}, "Invoice deleted successfully.");
};
