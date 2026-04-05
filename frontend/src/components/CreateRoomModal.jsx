import React, { useState } from "react";
import { useSelector } from "react-redux";

function CreateRoomModal({ onClose, onCreate }) {
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("public");
  const userData = useSelector((state) => state.user.user);
  const userId = userData?.user?.id; // ✅ safe access

  const handleSubmit = async () => {
    await onCreate({ roomName, roomType, userId });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50 bg-opacity-10 z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
          Create a Room
        </h2>

        {/* Room Name */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Room Name
        </label>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
          className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Room Type */}
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Room Type
        </label>
        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
          <label className="flex items-center space-x-2 mb-2 sm:mb-0">
            <input
              type="radio"
              value="public"
              checked={roomType === "public"}
              onChange={(e) => setRoomType(e.target.value)}
              className="text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-gray-700">Public</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="private"
              checked={roomType === "private"}
              onChange={(e) => setRoomType(e.target.value)}
              className="text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <span className="text-gray-700">Private</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 cursor-pointer w-full sm:w-auto">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 cursor-pointer w-full sm:w-auto">
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateRoomModal;
