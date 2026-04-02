import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";

const ChatSidebar = ({ isOpen, onSelectRoom, onClose }) => {
  const [rooms, setRooms] = useState([]);

  const userData = useSelector((state) => state.user.user);
  const userId = userData?.user?.id; // ✅ safe access

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ Create Room
  const handleCreateRoom = async (data) => {
    try {
      const payload = {
        roomName: data.roomName,
        userId,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/rooms/create`, // ✅ FIXED
        payload,
        { withCredentials: true }
      );

      reset();
      setRooms((prev) => [...prev, response.data.room]);
    } catch (error) {
      console.error("Create Room Error:", error);
    }
  };

  // ✅ Fetch Rooms
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/rooms/getRooms`, // ✅ FIXED
          { withCredentials: true }
        );

        setRooms(response.data.rooms);
      } catch (error) {
        console.error("Fetch Rooms Error:", error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 lg:hidden z-30"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-16 left-0 h-[calc(100vh-64px)] lg:h-auto w-64 bg-linear-to-b from-white to-gray-50 text-gray-800 border-r shadow-sm p-4 flex flex-col transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Header */}
        <h4 className="text-sm font-semibold text-gray-700 tracking-wide mb-3">
          Contact Group
        </h4>

        {/* Rooms List */}
        <ul className="space-y-2 flex-1 overflow-y-auto">
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <li
                key={room._id}
                onClick={() => {
                  onSelectRoom(room);
                  onClose();
                }}
                className="p-2 rounded-md bg-gray-100 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-colors duration-200"
              >
                {room.roomName}
              </li>
            ))
          ) : (
            <li className="p-2 text-center text-gray-400 italic">
              No rooms available
            </li>
          )}
        </ul>

        {/* Create Room */}
        <form
          onSubmit={handleSubmit(handleCreateRoom)}
          className="mt-4 space-y-2"
        >
          <input
            type="text"
            placeholder="New contact group name"
            className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            {...register("roomName", {
              required: "Room name is required",
            })}
          />

          {errors.roomName && (
            <p className="text-red-500 text-xs">
              {errors.roomName.message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-md font-medium cursor-pointer hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            Create Group
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatSidebar;