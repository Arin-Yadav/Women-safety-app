import express from "express";
import {
  getRoomWithPrivateMembers,
  handleAddnewMemebersToRoom,
  handleCreateRooms,
  handleGetRooms,
  handleRemovePrivateGroupMembers,
} from "../controllers/roomControllers.js";

const router = express.Router();

router.get("/getRooms", handleGetRooms);
router.post("/create", handleCreateRooms);
router.post("/:roomId/addMember", handleAddnewMemebersToRoom);
router.post("/:roomId/removeMember", handleRemovePrivateGroupMembers);
router.get("/:roomId/members", getRoomWithPrivateMembers);


export default router;
