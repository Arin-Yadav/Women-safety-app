import React, { useEffect, useState } from "react";
import axios from "axios";

const RecentActivity = ({ user }) => {
  if (!user || !user.id) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-500">
        Loading recent activity...
      </div>
    );
  }

  const userId = user.id;
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/activity/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setActivities(res.data);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
      }
    };
    fetchActivities();
  }, [userId]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Recent Activity
      </h3>

      {activities.length === 0 ? (
        <p className="text-gray-500">No recent activity found.</p>
      ) : (
        <ul className="space-y-4">
          {activities.slice(0,3).map((act) => (
            <li
              key={act._id}
              className="border-b pb-3 last:border-b-0 last:pb-0"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-indigo-600">{act.type}</span>
                <small className="text-gray-400">
                  {new Date(act.timestamp).toLocaleString()}
                </small>
              </div>
              <p className="text-gray-700 mt-1">{act.details}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentActivity;
