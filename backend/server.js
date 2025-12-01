import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
// import { authMiddleware } from "./middlewares/authMiddleware.js";
// const express = require("express")
// const cors = require("cors")
// const dotenv = require("dotenv")
// const connectDB = require("./config/db")
// const authRoutes = require("./routes/auth")

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", authRoutes);

// DB + Server
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
