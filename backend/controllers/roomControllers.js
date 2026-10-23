import Room from "../models/rooms.models.js";
import User from "../models/user.js";

async function handleCreateRooms(req, res) {
  try {
    const { roomName, roomType, userId } = req.body;

    // Check if room already exists
    const roomExist = await Room.findOne({ roomName });
    if (roomExist) {
      return res.status(409).json({
        message: "Room name already exists",
        success: false,
      });
    }

    // Create new room
    const room = await Room.create({
      roomName,
      roomType,
      createdBy: userId, // matches schema
    });

    res.status(201).json({
      message: "Room created successfully",
      success: true,
      room,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
}

async function handleGetRooms(req, res) {
  try {
    const userId = req.query.userId; 
    // console.log(userId)
    // const rooms = await Room.find().populate("createdBy", "username");

    const rooms = await Room.find({
      $or: [
        { roomType: "public" }, // everyone can see public rooms
        { roomMembers: userId }, // user is a member
        { createdBy: userId }, // user created the room
      ],
    }).populate("roomMembers", "email _id");

    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch rooms",
      error: error.message,
    });
  }
}

async function handleAddnewMemebersToRoom(req, res) {
  try {
    const { roomId } = req.params;
    const { email, userId } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    let room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    if (room.createdBy.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const userToAdd = await User.findOne({ email: normalizedEmail });

    if (userToAdd) {
      const alreadyMember = room.roomMembers.some(
        (id) => id.toString() === userToAdd._id.toString()
      );

      if (alreadyMember) {
        return res.status(400).json({
          success: false,
          message: "User already a member",
        });
      }

      room.roomMembers.push(userToAdd._id);
    } else {
      const alreadyEmergencyEmail = room.emergencyEmails?.some(
        (item) => item.email === normalizedEmail
      );

      if (alreadyEmergencyEmail) {
        return res.status(400).json({
          success: false,
          message: "Email already added",
        });
      }

      room.emergencyEmails.push({ email: normalizedEmail });
    }

    await room.save();

    room = await Room.findById(roomId).populate("roomMembers", "email _id");

    res.json({
      success: true,
      message: userToAdd ? "Registered member added" : "Emergency email added",
      members: room.roomMembers,
      emergencyEmails: room.emergencyEmails,
    });
  } catch (error) {
    console.error("Add member error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

// Get room with members populated
async function getRoomWithPrivateMembers(req, res) {
  try {
    const { roomId } = req.params;

    const room = await Room.findById(roomId).populate(
      "roomMembers",
      "email _id"
    );

    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    res.json({
  success: true,
  roomName: room.roomName,
  roomType: room.roomType,
  createdBy: room.createdBy,
  members: room.roomMembers,
  emergencyEmails: room.emergencyEmails || [],
});
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}

async function handleRemovePrivateGroupMembers(req, res) {
  try {
    const { roomId } = req.params;
    const { memberId, userId, type } = req.body;

    let room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    if (room.createdBy.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    if (type === "emergency") {
      room.emergencyEmails = room.emergencyEmails.filter(
        (item) =>
          item._id?.toString() !== memberId && item.email !== memberId
      );
    } else {
      room.roomMembers = room.roomMembers.filter(
        (id) => id.toString() !== memberId
      );
    }

    await room.save();

    room = await Room.findById(roomId).populate("roomMembers", "email _id");

    res.json({
      success: true,
      message: "Member removed",
      members: room.roomMembers,
      emergencyEmails: room.emergencyEmails || [],
    });
  } catch (error) {
    console.error("Remove member error:", error);
    res.status(500).json({ success: false, message: "Server error", error });
  }
}

export {
  handleCreateRooms,
  handleGetRooms,
  handleAddnewMemebersToRoom,
  handleRemovePrivateGroupMembers,
  getRoomWithPrivateMembers,
};
