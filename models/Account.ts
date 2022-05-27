import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  last: String,
  avatar: String,
  joined: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.Account || mongoose.model("Account", AccountSchema);
