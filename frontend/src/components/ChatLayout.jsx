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
import { addRoom, setCurrentRoomId, setRoom } from "../redux/slices/roomSlice";
import { IoChatbubbleOutline } from "react-icons/io5";

const ChatLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const rooms = useSelector((state) => state.room.rooms) || [];

  const fullUser = useSelector((state) => state.user);
  const user = fullUser?.user?.user;
  const userId = user?.id;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userId) return;

    const fetchRooms = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/rooms/getRooms`,
          {
            params: { userId },
            withCredentials: true,
          }
        );

        dispatch(setRoom(response.data.rooms || []));
      } catch (error) {
        console.error("Fetch Rooms Error:", error);
      }
    };

    fetchRooms();
  }, [dispatch, userId]);

  const handleCreateRoom = async (roomData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/rooms/create`,
        roomData,
        { withCredentials: true }
      );

      const newRoom = response.data.room;

      dispatch(setCurrentRoomId(newRoom._id));
      dispatch(addRoom(newRoom));

      setSelectedRoom(newRoom);
      setShowModal(false);
    } catch (error) {
      console.error("Create Room Error:", error);
    }
  };

  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full h-16 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="h-full px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-2xl text-purple-700"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {!sidebarOpen ? <RxHamburgerMenu /> : <IoMdClose />}
            </button>

            <h1 className="flex items-center gap-2 text-xl md:text-2xl font-bold text-purple-700">
              <IoChatbubbleOutline />
              Suraksha Chat
            </h1>
          </div>

          <Link
            to={RouteHomepage}
            className="bg-purple-700 text-white rounded-full hover:bg-purple-800 px-5 py-2 text-sm font-semibold transition"
          >
            Back Home
          </Link>
        </div>
      </nav>

      {/* Body */}
      <div className="flex pt-16 h-screen">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <ChatSidebar
          rooms={rooms}
          onSelectRoom={(room) => {
            setSelectedRoom(room);
            setSidebarOpen(false);
          }}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onOpenModal={() => setShowModal(true)}
        />

        <main className="flex-1 flex flex-col overflow-hidden bg-gray-50">
          {!selectedRoom ? (
            <div className="flex flex-col items-center justify-center flex-1 px-6 text-center">
              <div className="h-20 w-20 rounded-3xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5">
                <IoChatbubbleOutline className="text-4xl" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Welcome to Suraksha Chat
              </h2>

              <p className="text-gray-500 mt-3 max-w-md">
                Select a room from the sidebar to start chatting with your
                trusted contacts.
              </p>

              <button
                onClick={() => setShowModal(true)}
                className="mt-6 bg-gradient-to-r from-pink-500 to-purple-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:opacity-90 transition"
              >
                Create New Room
              </button>
            </div>
          ) : (
            <ChatArea room={selectedRoom} />
          )}
        </main>
      </div>

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