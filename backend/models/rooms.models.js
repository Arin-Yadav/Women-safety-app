import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    roomType: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },

    // Registered users
    roomMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Unregistered emergency contacts
    emergencyEmails: [
      {
        email: {
          type: String,
          trim: true,
          lowercase: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);