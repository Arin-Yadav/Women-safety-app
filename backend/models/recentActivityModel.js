// models/Activity.js
import mongoose from 'mongoose'

const activitySchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g. "SOS Triggered"
  details: { type: String }, // e.g. "Shared with 3 contacts"
  timestamp: { type: Date, default: Date.now }, // auto-set
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // link to User
});

const Activity = mongoose.model("Activity", activitySchema);

export default Activity