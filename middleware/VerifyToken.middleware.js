const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const { AppError } = require("../class/AppError");

exports.verifyToken = asyncHandler(async (req, res, next) => {
  let token = req.headers.token || false;
  // if token is not exists
  if (!token) {
    next(new AppError(`you have to login first`, 404));
    return;
  }
  // decoded token
  let { _id } = jwt.verify(token, process.env.SECRET_KEY);
  if (_id) {
    req.userID = _id;
    next();
  } else {
    next(new AppError(`Something went wrong`, 404));
    return;
  }
});
