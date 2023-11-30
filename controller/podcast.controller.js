const asyncHandler = require("express-async-handler");
const { PodcastModel } = require("../models/podcast.model");
const { ProjectModel } = require("../models/project.model");
const { AppError } = require("../class/AppError");

exports.getPodcast = asyncHandler(async (req, res, next) => {
  const userId = req.userID;
  const { limit = 10, page = 1, projectId } = req.query;

  // Calculate the number of documents to skip based on the page number and limit
  const skipDocs = (page - 1) * limit;

  const podcast = await PodcastModel.find({ projectId, userId })
    .sort({ createdAt: -1 })
    .skip(skipDocs)
    .limit(limit);

  // Count total documents without skipping and limiting
  const totalCount = await PodcastModel.countDocuments({ projectId, userId });

  // Calculate total pages based on the total count and the limit
  const totalPages = Math.ceil(totalCount / limit);

  // send response
  const response = {
    status: "success",
    message: "Successfully get",
    statusCode: 200,
    data: podcast,
    totalPages: totalPages,
  };
  return res.status(200).json(response);
});

exports.addPodcast = asyncHandler(async (req, res, next) => {
  const { name, description, projectId } = req.body;
  const userId = req.userID;
  const create_podcast = await PodcastModel.create({
    name,
    userId,
    description,
    projectId,
  });

  // Count total documents without skipping and limiting
  const totalCount = await PodcastModel.countDocuments({ userId });
  await ProjectModel.findByIdAndUpdate(projectId, { count: totalCount });

  // send response
  const response = {
    status: "success",
    message: "Successfully created",
    statusCode: 200,
    data: create_podcast,
  };
  return res.status(200).json(response);
});

exports.updatePodcast = asyncHandler(async (req, res, next) => {
  const podcastId = req.params.id;
  const { name, description } = req.body;

  const newData = {};
  if (name) {
    newData.name = name;
  }
  if (description) {
    newData.description = description;
  }

  const updatedPodcast = await PodcastModel.findByIdAndUpdate(
    podcastId,
    newData,
    { new: true }
  );
  // send response
  const response = {
    status: "success",
    message: "Successfully updated",
    statusCode: 200,
    data: updatedPodcast,
  };
  return res.status(200).json(response);
});

exports.deletePodcast = asyncHandler(async (req, res, next) => {
  const podcastId = req.params.id;

  const deletePodcast = await PodcastModel.findByIdAndDelete(podcastId, {
    new: true,
  });
  // send response
  const response = {
    status: "success",
    message: "Successfully deleted",
    statusCode: 200,
    data: deletePodcast,
  };
  return res.status(200).json(response);
});
