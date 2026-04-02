import express from "express";
import {
  handleCreateNewUsers,
  handleSignin,
  handleLogout,
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/signup", handleCreateNewUsers);
router.post("/login", handleSignin);
router.post("/logout", handleLogout);

export default router;