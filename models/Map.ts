import mongoose from "mongoose";

const MapSchema = new mongoose.Schema({
  family: String,
  markers: [
    {
      title: String,
      status: String,
      radius: Number,
      position: [Number],
      child: String,
    },
  ],
});

module.exports = mongoose.models.Map || mongoose.model("Map", MapSchema);
