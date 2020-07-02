const path = require("path");
const Database = require(path.join(__dirname, "..", "database", "db"));
const InvoiceModel = require(path.join(__dirname, "..", "models", "Invoice"));
const { internalServerProblem, successResponse } = require(path.join(
  __dirname,
  "..",
  "helpers",
  "response"
));

exports.filterInvoiceGet = async (req, res) => {
  const { asec, desc } = req.query;
  let response,
    type = asec === "1" ? "date" : desc === "1" ? "-date" : 0;
  if (req.user.isAdmin) {
    response = await Database.sortDataBy(InvoiceModel, type);
  } else {
    response = await Database.sortDataBy(InvoiceModel, type, {
      userid: req.user.id,
    });
  }

  if (!response.success) {
    return internalServerProblem(res, response.error);
  }
  return successResponse(res, 200, response, "invoice found");
};
