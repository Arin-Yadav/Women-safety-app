import Room from '../models/rooms.models.js'

async function handleCreateRooms(req, res) {
  try {
    const { roomName, userId } = req.body;

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
    const rooms = await Room.find().populate("createdBy", "username");
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


export {handleCreateRooms, handleGetRooms}