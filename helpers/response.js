// Response for internal server problem or database connection issue
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

// Response for success
exports.successResponse = (res, statusCode, data, message) => {
  return res.status(statusCode).json({
    success: true,
    message: message || "executed successfully",
    ...data,
  });
};

// Response if any validation fails
exports.validationErrorResponse = (res, error) => {
  return res.status(422).json({
    success: false,
    error,
  });
};

// Response if user without token try to make request
exports.unAuthorizedResponse = (res) => {
  return res.status(401).json({
    success: false,
    message: "UnAuthorized user",
  });
};

// Response if email or password did not match
exports.unAuthenticatedResponse = (res) => {
  return res.status(401).json({
    success: false,
    message: "Entered username or password is incorrect",
  });
};

// Response if no user found in the database
exports.noUserFoundResponse = (res) => {
  return res.status(302).json({
    success: false,
    message: "No user found",
  });
};

// Response if endpoint is not available
exports.endPointNotFound = (res) => {
  return res.status(404).json({
    success: false,
    message: "Page not found.",
  });
};
