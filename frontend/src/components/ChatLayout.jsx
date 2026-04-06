import React, { useEffect, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatArea from "./ChatArea";
import { Link } from "react-router-dom";
import { RouteHomepage } from "../helpers/RouteName";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import CreateRoomModal from "./CreateRoomModal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentRoomId } from "../redux/slices/roomSlice";

const ChatLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState([]);

  const fullUser = useSelector((state) => state.user);
  const user = fullUser?.user?.user;
  const userId = user?.id;
  // console.log(userId)

  const dispatch = useDispatch()

  useEffect(() => {
    // fetching rooms with fitered
    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/rooms/getRooms`,
          { params: { userId }, withCredentials: true },
        );
        setRooms(response.data.rooms);
      } catch (error) {
        console.error("Fetch Rooms Error:", error);
      }
    };
    fetchRooms();
  }, [userId]);

  const handleCreateRoom = async (roomData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/rooms/create`, // ✅ FIXED
        roomData,
        { withCredentials: true },
      );
      console.log(response.data.room._id)
      const roomId = response.data.room._id
      dispatch(setCurrentRoomId(roomId))
      
      const newRooms = response.data.room;
      setRooms((prev) => [...prev, newRooms]);
      setShowModal(false);
      
    } catch (error) {
      console.error("Create Room Error:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="h-16 bg-blue-600 text-white flex fixed top-0 z-50 w-full items-center justify-between px-4">
        <h1 className="font-bold">My Chat App</h1>
        {/* Hamburger button only on small screens */}
        <div className="flex items-center gap-2 justify-center">
          <Link
            to={RouteHomepage}
            className="bg-red-600 rounded-md hover:bg-red-700 px-5 py-2 cursor-pointer">
            Back
          </Link>
          <button
            className={`lg:hidden p-2 text-white rounded-md cursor-pointer`}
            onClick={() => {
              setSidebarOpen(!sidebarOpen);
            }}>
            {!sidebarOpen ? <RxHamburgerMenu /> : <IoMdClose />}
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 mt-16 h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <ChatSidebar
          rooms={rooms}
          onSelectRoom={setSelectedRoom}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onOpenModal={() => setShowModal(true)}
        />
        {/* Main content - Chatting Area */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {!selectedRoom ? (
            <div className="flex flex-col items-center justify-center flex-1">
              <p className="text-gray-600 mb-4">
                Select to chat with your contacts.
              </p>
            </div>
          ) : (
            <ChatArea room={selectedRoom} />
          )}
        </div>
      </div>

      {/* Modal overlay (on top of everything) */}
      {showModal && (
        <CreateRoomModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateRoom}
        />
      )}
    </div>
  );
};

export default ChatLayout;
