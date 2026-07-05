import express from "express";
import Message from "../models/messages.models.js";
import Room from "../models/rooms.models.js";
import User from "../models/user.js";
import { sendSosEmail } from "../helpers/sendSosEmail.js";

const router = express.Router();

router.post("/sos", async (req, res) => {
  try {
    const { roomId, message } = req.body;

    if (!roomId || !message?.userId || !message?.lat || !message?.lng) {
      return res.status(400).json({
        success: false,
        message: "roomId, userId, lat and lng are required",
      });
    }

    let savedMessage = await Message.create({
      room: roomId,
      sender: message.userId,
      type: "location",
      lat: message.lat,
      lng: message.lng,
    });

    savedMessage = await savedMessage.populate("sender", "username fullName");

    const room = await Room.findById(roomId).populate(
      "roomMembers",
      "email username fullName"
    );

    const senderUser = await User.findById(message.userId).select(
      "username fullName email"
    );

    const registeredEmails = room.roomMembers
  .filter((member) => member._id.toString() !== message.userId)
  .map((member) => member.email)
  .filter(Boolean);

const emergencyEmails =
  room.emergencyEmails?.map((item) => item.email).filter(Boolean) || [];

const emails = [...new Set([...registeredEmails, ...emergencyEmails])];

    if (emails.length > 0) {
      await sendSosEmail({
        to: emails,
        senderName:
          senderUser?.fullName || senderUser?.username || "Someone",
        lat: message.lat,
        lng: message.lng,
      });
    }

    res.status(200).json({
      success: true,
      message: savedMessage,
      emailsSentTo: emails,
    });
  } catch (error) {
    console.error("SOS Error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

export default router;