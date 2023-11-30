const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    avatar: { type: String, trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true, trim: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const AuthModel = mongoose.model("auth", authSchema);
module.exports = { AuthModel };