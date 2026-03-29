import express from "express";
import {
  handleCreateMessage,
  handleGetMessages,
} from "../controllers/messageControllers.js";

const router = express.Router();

router.get("/:roomId", handleGetMessages);
router.post("/send", handleCreateMessage);

export default router;
