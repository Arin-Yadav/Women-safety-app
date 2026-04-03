import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";

const ChatSidebar = ({ isOpen, onSelectRoom, onClose }) => {
  const [rooms, setRooms] = useState([]);
  const userData = useSelector((state) => state.user.user);
  const userId = userData.user.id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCreateRoom = async (data) => {
    try {
      const payload = { roomName: data.roomName, userId };
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rooms/create`,
        payload,
        { withCredentials: true },
      );
      reset();
      setRooms((prev) => [...prev, response.data.room]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/rooms/getRooms`,
          { withCredentials: true },
        );
        setRooms(response.data.rooms);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className={`${isOpen ? "block" : "hidden"} lg:block`}>
      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Groups</h2>

      <div className="mt-6 space-y-3">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <button
              key={room._id}
              type="button"
              onClick={() => {
                onSelectRoom(room);
                onClose();
              }}
              className="block w-full border-b border-slate-200 pb-3 text-left text-sm font-medium text-slate-700 hover:text-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:text-white"
            >
              {room.roomName}
            </button>
          ))
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">No groups available</p>
        )}
      </div>

      <form onSubmit={handleSubmit(handleCreateRoom)} className="mt-8 space-y-3">
        <input
          type="text"
          placeholder="New group name"
          className="w-full border-b border-slate-300 bg-transparent px-0 py-2 text-sm focus:outline-none dark:border-slate-700 dark:text-white"
          {...register("roomName", { required: "Room name is required" })}
        />
        {errors.roomName && (
          <p className="text-xs text-red-500">{errors.roomName.message}</p>
        )}

        <button
          type="submit"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          Create Group
        </button>
      </form>
    </div>
  );
};

export default ChatSidebar;
