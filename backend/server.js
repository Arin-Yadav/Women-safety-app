import express from "express";
import cors from "cors";
import http from 'http'
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contactRoute.js";
import activityRoutes from "./routes/activityRoute.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import initSocket from './helpers/socket.js'
import roomRoutes from './routes/roomRoutes.js'
import messageRoutes from "./routes/messageRoute.js";

dotenv.config();
const app = express();
const server = http.createServer(app);

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", authRoutes);
app.use("/rooms", roomRoutes)
app.use("/messages", messageRoutes);
app.use("/api", authMiddleware, contactRoutes);
app.use("/api", authMiddleware, activityRoutes);

// DB + Server
connectDB();

// Initialize Socket.IO
initSocket(server);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
