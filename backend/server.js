import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import contactRoutes from "./routes/contactRoute.js";
import activityRoutes from "./routes/activityRoute.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

dotenv.config();
const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", authRoutes);
app.use("/api", authMiddleware, contactRoutes);
app.use("/api", authMiddleware, activityRoutes);

// DB + Server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
