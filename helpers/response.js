exports.internalServerProblem = (res, error) => {
  let response = { success: false, message: "Internal server problem" };
  if (error) {
    response = {
      ...response,
      error,
    };
  }
  return res.status(500).json(response);
};

exports.successResponse = (res, statusCode, data, message) => {
  return res.status(statusCode).json({
    success: true,
    message: message || "executed successfully",
    ...data,
  });
};

exports.validationErrorResponse = (res, error) => {
  return res.status(422).json(error);
};

exports.unAuthorizedResponse = (res) => {
  return res.status(401).json({
    success: false,
    message: "UnAuthorized user",
  });
};

exports.unAuthenticatedResponse = (res) => {
  return res.status(401).json({
    success: false,
    message: "Entered username or password is incorrect",
  });
};

exports.noUserFoundResponse = (res) => {
  return res.status(302).json({
    success: false,
    message: "No user found",
  });
};
