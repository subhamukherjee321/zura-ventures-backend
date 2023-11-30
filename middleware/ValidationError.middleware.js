const asyncHandler = require("express-async-handler");
const { AppError } = require("../class/AppError");
const { validationResult } = require("express-validator");

exports.validationError = asyncHandler(async (req, res, next) => {
  // If any error exists then throw Error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError(errors.array()[0].msg, 400));
  }
  next();
});