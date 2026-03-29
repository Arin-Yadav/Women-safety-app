import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatArea from "./ChatArea";

const ChatLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  // const [messages, setMessages] = useState([]);
  // const [typingUser, setTypingUser] = useState(null);

  // const { sendMessage, startTyping, stopTyping } = useSocket(
  //   selectedRoom?.id,
  //   // currentUser.id,
  //   (message) => setMessages((prev) => [...prev, message]),
  //   (username) => setTypingUser(username),
  //   () => setTypingUser(null),
  // );

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <div className="h-14 bg-blue-600 text-white flex items-center px-4">
        <h1 className="font-bold">My Chat App</h1>
      </div>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <ChatSidebar onSelectRoom={setSelectedRoom} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
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
