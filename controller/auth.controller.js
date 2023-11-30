const asyncHandler = require("express-async-handler");
const { AuthModel } = require("../models/auth.model");
const { AppError } = require("../class/AppError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = asyncHandler(async (req, res, next) => {
  const { email, username, password, avatar } = req.body;

  // if user is not exists throw error
  const isUserExists = await AuthModel.findOne({ email });

  // if user exists the check and send success
  if (isUserExists) {
    // if user exists then check password
    const isPassword = await bcrypt.compare(password, isUserExists.password);
    if (!isPassword) {
      next(new AppError(`Invalid credentials`, 400));
      return;
    }

    // if store usernname not match the given username then update replace username
    if (username !== isUserExists.username) {
      await AuthModel.findByIdAndUpdate(isUserExists._id, { username });
    }
    // if password is match then create jwt token
    const token = jwt.sign({ _id: isUserExists._id }, process.env.SECRET_KEY);

    // send response
    const response = {
      status: "success",
      message: "Successfully Login",
      statusCode: 200,
      data: {
        token,
        username: username,
        email: isUserExists.email,
        avatar: isUserExists.avatar,
      },
    };
    return res.status(200).json(response);
  }

  // if not exists then store data and send success response
  // hash password
  const hashPassword = await bcrypt.hash(
    password,
    Number(process.env.SALT_ROUND)
  );
  // create user
  const create_user = await AuthModel.create({
    email,
    username,
    password: hashPassword,
    avatar,
  });
  // create token
  const token = jwt.sign({ _id: create_user._id }, process.env.SECRET_KEY);
  // send response
  const response = {
    status: "success",
    message: "Successfully Login",
    statusCode: 200,
    data: {
      token,
      username: create_user.username,
      email: create_user.email,
      avatar: create_user.avatar,
    },
  };
  return res.status(200).json(response);
});
