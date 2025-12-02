import express from "express";
import { addContacts } from "../controllers/contact.js";

const router = express.Router();

// POST /api/addcontacts
router.post("/addcontacts", addContacts);

export default router;
