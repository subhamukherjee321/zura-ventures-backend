const asyncHandler = require("express-async-handler");
const { ProjectModel } = require("../models/project.model");
const { AppError } = require("../class/AppError");

exports.getProject = asyncHandler(async (req, res, next) => {
  const userId = req.userID;
  const { limit = 10, page = 1 } = req.query;

  // Calculate the number of documents to skip based on the page number and limit
  const skipDocs = (page - 1) * limit;

  // Query the ProjectModel with pagination
  const projects = await ProjectModel.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skipDocs)
    .limit(limit);

  // Count total documents without skipping and limiting
  const totalCount = await ProjectModel.countDocuments({ userId });

  // Calculate total pages based on the total count and the limit
  const totalPages = Math.ceil(totalCount / limit);

  // send response
  const response = {
    status: "success",
    message: "Successfully get",
    statusCode: 200,
    data: projects,
    totalPages: totalPages,
  };
  return res.status(200).json(response);
});

exports.addProject = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const userId = req.userID;
  const create_project = await ProjectModel.create({ name, userId });
  // send response
  const response = {
    status: "success",
    message: "Successfully created",
    statusCode: 200,
    data: create_project,
  };
  return res.status(200).json(response);
});
