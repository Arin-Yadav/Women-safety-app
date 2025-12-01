import express from "express";
import { handleCreateNewUsers, handleSignin } from "../controllers/authControllers.js";


const router = express.Router();

router.post("/signup", handleCreateNewUsers);
router.post("/signin", handleSignin);

export default router;
