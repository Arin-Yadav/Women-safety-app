import express from "express";
import { addContacts, getContacts } from "../controllers/contact.js";


const router = express.Router();

// POST /api/addcontacts
router.post("/addcontacts", addContacts);
router.get("/getcontacts", getContacts);

export default router;
