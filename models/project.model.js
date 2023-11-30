const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    name: { type: String, required: true, trim: true },
    count: { type: Number, trim: true, default: 0 },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const ProjectModel = mongoose.model("project", projectSchema);
module.exports = { ProjectModel };
