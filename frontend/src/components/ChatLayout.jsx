import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatArea from "./ChatArea";
import { Link } from "react-router-dom";
import { RouteHomepage } from "../helpers/RouteName";
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";


const ChatLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="h-16 bg-blue-600 text-white flex items-center justify-between px-4">
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
            onClick={function () {
              setSidebarOpen(!sidebarOpen);
            }}>
            {!sidebarOpen ? <RxHamburgerMenu /> : <IoMdClose />}
          </button>
        </div>
      </div>
      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <ChatSidebar
          onSelectRoom={setSelectedRoom}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
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
    </div>
  );
};

export default ChatLayout;
