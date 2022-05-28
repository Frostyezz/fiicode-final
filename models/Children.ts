import mongoose from "mongoose";

const ChildrenSchema = new mongoose.Schema({
  name: String,
  avatar: String,
});

module.exports =
  mongoose.models.Children || mongoose.model("Children", ChildrenSchema);
