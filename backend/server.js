import express from "express";
import cors from "cors";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contactRoute.js";
import activityRoutes from "./routes/activityRoute.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import initSocket from "./helpers/socket.js";
import roomRoutes from "./routes/roomRoutes.js";
import messageRoutes from "./routes/messageRoute.js";
import sosRoutes from "./routes/liveLocationMessage.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// ✅ Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // ✅ IMPORTANT

// ✅ Routes
app.use("/api", authRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api", sosRoutes);

// 🔐 Protected routes
app.use("/api", authMiddleware, contactRoutes);
app.use("/api", authMiddleware, activityRoutes);

// ✅ DB
connectDB();

// ✅ Socket
initSocket(server);

// ✅ Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);