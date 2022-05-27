import mongoose from "mongoose";

const FamilySchema = new mongoose.Schema({
  members: [String],
  children: [String],
});

module.exports =
  mongoose.models.Familie || mongoose.model("Familie", FamilySchema);
