const path = require("path");
const userModel = require(path.join(__dirname, "..", "models", "User"));
const invoiceModel = require(path.join(__dirname, "..", "models", "Invoice"));
const Database = require(path.join(__dirname, "..", "database", "db"));
const {
  internalServerProblem,
  successResponse,
  noUserFoundResponse,
  unAuthorizedResponse,
} = require(path.join(__dirname, "..", "helpers", "response"));

exports.userGet = async (req, res) => {
  const id = req.user.id;
  const user = await Database.findByKey(userModel, { _id: id });
  if (!user.success) {
    if (user.error) return internalServerProblem(res);
    return noUserFoundResponse(res);
  }
  const userDetails = {
    admin: user.data.isAdmin,
    username: user.data.username,
    email: user.data.email,
  };
  return successResponse(res, 200, { user: userDetails }, "user found.");
};

exports.usersGet = async (req, res) => {
  const admin = req.user.isAdmin;
  if (!admin) {
    return unAuthorizedResponse(res);
  }
  const users = await Database.findAll(userModel, ["-password"]);
  if (!users.success) {
    if (user.error) return internalServerProblem(res);
    return noUserFoundResponse(res);
  }
  return successResponse(res, 200, { users: users.data }, "success response.");
};

exports.userDelete = async (req, res) => {
  const id = req.user.id;
  if(!id) return internalServerProblem(res);
  const user = await Database.findOneAndDelete(userModel, { _id: id });
  if (!user.success) {
    if (user.error) return internalServerProblem(res);
    return noUserFoundResponse(res);
  }
  const invoices = await Database.findAllByKey(invoiceModel, { userid: id });
  if (!invoices.success) {
    if (invoices.error) return internalServerProblem(res);
  }
  invoices.data.forEach(async invoice => {
    const inv = await invoices.findOneAndDelete(invoiceModel, { _id: invoice._id });
    if (!inv.success) {
      if (inv.error) return internalServerProblem(res);
    }
  })
  return successResponse(res, 200, {}, "User deleted successful.");
}