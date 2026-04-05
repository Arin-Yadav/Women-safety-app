import Message from "../models/messages.models.js";
import Room from "../models/rooms.models.js";

async function handleGetMessages(req, res) {
  try {
    const { roomId } = req.params;
    const userId = req.query.userId;

    // console.log(roomId);
    // console.log(userId);

    const room = await Room.findById(roomId);
    // console.log(room);

    if (!room)
      return res.status(404).json({ success: false, message: "No room found" });

    // Block outsiders
    if (
      room.roomType === "private" &&
      !room.roomMembers.includes(userId) &&
      room.createdBy.toString() !== userId
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    const messages = await Message.find({ room: roomId })
      .populate("sender", "username")
      .sort({ createdAt: 1 });
    res.json({ success: true, messages });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

async function handleCreateMessage(req, res) {
  try {
    const { roomId, senderId, text } = req.body;

    let message = await Message.create({
      room: roomId, // ✅ correct field
      sender: senderId, // ObjectId
      text,
    });

    message = await message.populate("sender", "username");

    // ✅ unified event name
    io.to(roomId).emit("receiveMessage", message);

    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}

export { handleGetMessages, handleCreateMessage };
