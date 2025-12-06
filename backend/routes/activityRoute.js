import express from "express";
// import {
//   getRecentActivity,
//   logNewActivity,
// } from "../controllers/activityControllers.js";

// // GET /api/recentactivity → handled by getRecentActivity controller
// router.get("/recentactivity", getRecentActivity);

// // POST /api/recentactivity → handled by logNewActivity controller
// router.post("/recentactivity", logNewActivity);

import RecentActivity from "../models/recentActivityModel.js";
const router = express.Router();

// GET recent activities for a user
router.get("/activity/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const activities = await RecentActivity.find({ userId }).sort({
      timestamp: -1,
    }); // latest first

    res.json(activities);
  } catch (err) {
    console.error("Error fetching activities:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
