import Message from "../models/messages.models.js";
import Room from "../models/rooms.models.js";

async function handleGetMessages(req, res) {
  try {
    const { roomId } = req.params;
    const { userId } = req.query;

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "No room found",
      });
    }

    const isMember = room.roomMembers.some(
      (memberId) => memberId.toString() === userId
    );

    const isCreator = room.createdBy.toString() === userId;

    if (room.roomType === "private" && !isMember && !isCreator) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    const messages = await Message.find({ room: roomId })
      .populate("sender", "username fullName")
      .sort({ createdAt: 1 });

    res.json({
      success: true,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

async function handleCreateMessage(req, res) {
  try {
    const { roomId, senderId, text } = req.body;

    let message = await Message.create({
      room: roomId,
      sender: senderId,
      text,
      type: "text",
    });

    message = await message.populate("sender", "username fullName");

    res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

export { handleGetMessages, handleCreateMessage };