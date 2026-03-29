import express from "express";
import {
  handleCreateRooms,
  handleGetRooms,
} from "../controllers/roomControllers.js";

const router = express.Router();

router.get("/getRooms", handleGetRooms);
router.post("/create", handleCreateRooms);

export default router;
