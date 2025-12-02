import mongoose from "mongoose";
import User from "../models/user.js";

// Add emergency contacts
export const addContacts = async (req, res) => {
try {
    const { userId, contacts } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }
    if (!Array.isArray(contacts)) {
      return res.status(400).json({ message: "Contacts must be an array" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.contacts.push(...contacts);
    await user.save();

    res.status(201).json({ message: "Contacts added", contacts: user.contacts });
  } catch (err) {
    console.error("Error in addContacts:", err);
    res.status(500).json({ message: "Server error" });
  }
};
