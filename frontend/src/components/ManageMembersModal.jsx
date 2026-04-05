import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function ManageMembersModal({ roomId, onClose }) {
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState([]);

  const fullUser = useSelector((state) => state.user);
  const user = fullUser?.user?.user;
  const userId = user?.id;

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/rooms/${roomId}/members`,
          { withCredentials: true },
        );
        setMembers(response.data.members);
      } catch (error) {
        console.error("Fetch Members Error:", error);
      }
    };

    fetchMembers();
  }, [roomId]);

  const handleAddMember = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/rooms/${roomId}/addMember`,
        { email, userId },
        { withCredentials: true },
      );
      setMembers(response.data.members); // update members list
      setEmail("");
    } catch (error) {
      console.error("Add Member Error:", error);
    }
  };

  const handleRemoveMember = async (memberId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/rooms/${roomId}/removeMember`,
        { memberId, userId },
        { withCredentials: true },
      );
      setMembers(response.data.members);
    } catch (error) {
      console.error("Remove Member Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-40 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 sm:mx-0 p-6 sm:p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Manage Members</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition">
            ✕
          </button>
        </div>

        {/* Add Member */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user email"
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={handleAddMember}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer">
            Add
          </button>
        </div>

        {/* Members List */}
        <div className="max-h-64 overflow-y-auto">
          <ul className="divide-y divide-gray-200">
            {members.length > 0 ? (
              members.map((m) => (
                <li
                  key={m._id}
                  className="flex justify-between items-center py-3 px-2 hover:bg-gray-50 rounded-lg transition">
                  <span className="text-gray-700">{m.email}</span>
                  <button
                    onClick={() => handleRemoveMember(m._id)}
                    className="text-sm text-red-600 hover:text-red-800 transition cursor-pointer">
                    Remove
                  </button>
                </li>
              ))
            ) : (
              <li className="text-gray-400 italic py-3">No members yet</li>
            )}
          </ul>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition cursor-pointer">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ManageMembersModal;
