import express from "express";

import {
  handleCreateNewUsers,
  handleSignin,
  handleLogout,
  handleForgotPassword,
  handleResetPassword,
} from "../controllers/authControllers.js";

const router = express.Router();


// AUTH
router.post("/signup", handleCreateNewUsers);

router.post("/login", handleSignin);

router.post("/logout", handleLogout);


// FORGOT PASSWORD
router.post(
  "/forgot-password",
  handleForgotPassword
);


// RESET PASSWORD
router.post(
  "/reset-password/:token",
  handleResetPassword
);

export default router;