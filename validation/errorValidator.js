exports.errorValidator = (err) => {
  if (!err.isEmpty()) {
    const errors = {};
    for (let error of err.array()) {
      errors[error.param] = error.msg;
    }
    return { errors, success: false };
  }
  return {
      success: true
  }
};
