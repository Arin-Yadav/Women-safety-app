import mongoose from "mongoose";
import User from "../models/user.js";
import RecentActivity from "../models/recentActivityModel.js";

// Add emergency contacts
export const addContacts = async (req, res) => {
  try {
    const { userId, contacts } = req.body;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }

    // Validate contacts array
    if (!Array.isArray(contacts)) {
      return res.status(400).json({ message: "Contacts must be an array" });
    }

    // Find user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Add contacts
    user.contacts.push(...contacts);
    await user.save();

    // Log activity (NEW STEP)
    await RecentActivity.create({
      userId: user._id,
      type: "Contact Added",
      details: `Added ${contacts.length} contact(s)`,
      timestamp: new Date(),
    });

    // Response
    res.status(201).json({
      message: "Contacts added",
      contacts: user.contacts,
    });
  } catch (err) {
    console.error("Error in addContacts:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get emergency contacts
export const getContacts = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    // console.log("getContacts user:", user.contacts);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ contacts: user.contacts });
  } catch (error) {
    console.error("Error in getContacts:", error);
    res.status(500).json({ message: "Server error" });
  }
};
