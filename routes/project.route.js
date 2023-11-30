const projectRouter = require("express").Router();
const { body } = require("express-validator");
const middleware = require("../middleware/ValidationError.middleware");
const { verifyToken } = require("../middleware/VerifyToken.middleware");
const { getProject, addProject } = require("../controller/project.controller");

projectRouter.route("/get").get(verifyToken, getProject);
projectRouter
  .route("/add")
  .post(
    [body("name").notEmpty().withMessage("name is required")],
    middleware.validationError,
    verifyToken,
    addProject
  );

module.exports = {
  projectRouter,
};
