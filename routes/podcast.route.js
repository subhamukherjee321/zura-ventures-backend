const podcastRouter = require("express").Router();
const { body } = require("express-validator");
const middleware = require("../middleware/ValidationError.middleware");
const { verifyToken } = require("../middleware/VerifyToken.middleware");
const {
  getPodcast,
  addPodcast,
  updatePodcast,
  deletePodcast
} = require("../controller/podcast.controller");

podcastRouter.route("/get").get(verifyToken, getPodcast);

podcastRouter
  .route("/add")
  .post(
    [
      body("name").notEmpty().withMessage("name is required"),
      body("description").notEmpty().withMessage("description is required"),
      body("projectId").notEmpty().withMessage("Somthing went wrong"),
    ],
    middleware.validationError,
    verifyToken,
    addPodcast
  );

podcastRouter.route("/update/:id").patch(verifyToken, updatePodcast);
podcastRouter.route("/delete/:id").delete(verifyToken, deletePodcast);

module.exports = {
  podcastRouter,
};
