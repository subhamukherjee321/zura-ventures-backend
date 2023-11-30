const authRouter = require("express").Router();
const { body } = require("express-validator");
const middleware = require("../middleware/ValidationError.middleware");
const auth = require("../controller/auth.controller");
const { verifyToken } = require("../middleware/VerifyToken.middleware");

authRouter.route("/login").post(
  [
    // Password is required and password length must be atleast 4
    body("username").notEmpty().withMessage("username is required"),

    // email required and valid email
    body("email", "Enter a vaild email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email"),
    // Password is required and password length must be atleast 4
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({
        min: 4,
      })
      .withMessage("Password length must be atleast 4"),
  ],
  middleware.validationError,
  auth.login
);
authRouter.route("/update").patch(verifyToken, auth.updateUser);
module.exports = {
  authRouter,
};
