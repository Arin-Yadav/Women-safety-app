import express from "express";

import {
  handleCreateNewUsers,
  handleSignin,
  handleLogout,
  handleForgotPassword,
  handleResetPassword,
  handleEditProfile,
} from "../controllers/authControllers.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// AUTH
router.post("/signup", handleCreateNewUsers);
router.post("/login", handleSignin);
router.post("/logout", handleLogout);

// EDIT PROFILE
router.patch("/profile", authMiddleware, handleEditProfile);

// FORGOT PASSWORD
router.post("/forgot-password", handleForgotPassword);

// RESET PASSWORD
router.post("/reset-password/:token", handleResetPassword);

export default router;
