const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
    },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const PodcastModel = mongoose.model("podcast", podcastSchema);
module.exports = { PodcastModel };
