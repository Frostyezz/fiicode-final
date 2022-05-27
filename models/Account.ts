import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  email: String,
  password: String,
  username: String,
  joined: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.Account || mongoose.model("Account", AccountSchema);
