import express from "express";
import Message from '../models/messages.models.js'

const router = express.Router();

// POST /api/sos
router.post("/sos", async (req, res) => {
  const { roomId, message } = req.body;

  try {
    const savedMessage = await Message.create({
      room: roomId,
      sender: message.userId,
      type: "location",
      lat: message.lat,
      lng: message.lng,
    });

    res.status(200).json({ success: true, message: savedMessage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;

