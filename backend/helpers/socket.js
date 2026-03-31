import { Server } from "socket.io";
import Message from "../models/messages.models.js";

export default function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    // Join room
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
    });

    // Send message
    socket.on("sendMessage", async (data) => {
      try {
        let message = new Message({
          room: data.roomId,
          sender: data.sender,
          text: data.text,
        });
        await message.save();
        message = await message.populate("sender", "username");
        io.to(data.roomId).emit("receiveMessage", message);
      } catch (err) {
        console.error("Error saving message:", err);
      }
    });

    // SOS event
    socket.on("sendSOS", ({ roomId, sender, location }) => {
      io.to(roomId).emit("receiveSOS", {
        sender,
        location,
        timestamp: new Date(),
      });
    });

    // Typing indicators
    socket.on("typing", ({ roomId, username }) => {
      socket.to(roomId).emit("userTyping", { username });
    });
    socket.on("stopTyping", ({ roomId, username }) => {
      socket.to(roomId).emit("userStopTyping", { username });
    });

    // socket.on("disconnect", () => {
    //   console.log("User disconnected:", socket.id);
    // });
  });

  return io;
}
