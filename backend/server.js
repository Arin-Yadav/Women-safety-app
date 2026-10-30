import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import initSocket from "./helpers/socket.js";
import roomRoutes from "./routes/roomRoutes.js";
import messageRoutes from "./routes/messageRoute.js";
import sosRoutes from "./routes/liveLocationMessage.js";


dotenv.config();
const app = express();
const server = http.createServer(app);

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api", sosRoutes);

// DB
await connectDB(); // default - connectDB()

// Socket
initSocket(server);

// Server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);