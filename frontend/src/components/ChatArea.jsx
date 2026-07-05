import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../hooks/useSocket";
import axios from "axios";
import dayjs from "dayjs";
import ManageMembersModal from "./ManageMembersModal";
import { IoSend, IoPeopleOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";

const MessageBubble = React.memo(({ msg, userId }) => {
  const isOwnMessage = msg?.sender?._id === userId;

  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative px-4 py-3 rounded-2xl text-sm break-words shadow-sm ${
          isOwnMessage
            ? "bg-gradient-to-r from-pink-500 to-purple-700 text-white rounded-br-md"
            : "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
        } max-w-[85%] sm:max-w-[70%] md:max-w-[55%]`}
      >
        {msg?.type === "location" ? (
          <>
            <p className="font-medium flex items-center gap-1">
              <CiLocationOn className="text-lg" />
              {msg?.sender?.username} shared live location
            </p>

            <div className="mt-3 overflow-hidden rounded-xl border border-white/20">
              <div className="relative w-full pb-[75%] max-h-64">
                <iframe
                  src={`https://maps.google.com/maps?q=${msg.lat},${msg.lng}&z=15&output=embed`}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </>
        ) : (
          <p className="whitespace-pre-wrap leading-relaxed">{msg?.text}</p>
        )}

        <div
          className={`flex gap-3 justify-end items-center mt-2 text-[11px] ${
            isOwnMessage ? "text-white/75" : "text-gray-400"
          }`}
        >
          {!isOwnMessage && <span>{msg?.sender?.username}</span>}
          <span>{dayjs(msg?.createdAt).format("h:mm A")}</span>
        </div>
      </div>
    </div>
  );
});

const MessageList = React.memo(({ messages, userId }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 md:px-6 py-5 space-y-3 bg-gray-50">
      {messages.map((msg) => (
        <MessageBubble key={msg._id} msg={msg} userId={userId} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
});

const ChatArea = ({ room }) => {
  const fullUser = useSelector((state) => state.user);
  const user = fullUser?.user?.user;
  const userId = user?.id;
  const username = user?.fullName;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typingUsers, setTypingUsers] = useState([]);
  const [showManageModal, setShowManageModal] = useState(false);

  const typingTimeoutRef = useRef(null);

  const { sendMessage, startTyping, stopTyping } = useSocket(
    room._id,
    userId,
    (message) => {
      setMessages((prev) => [...prev, message]);
    },
    (typingUsername) =>
      setTypingUsers((prev) => [...new Set([...prev, typingUsername])]),
    (typingUsername) =>
      setTypingUsers((prev) => prev.filter((u) => u !== typingUsername))
  );

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/messages/${room._id}`,
          { params: { userId }, withCredentials: true }
        );

        setMessages(res.data.messages || []);
      } catch (error) {
        console.log(error);
      }
    };

    if (room?._id) fetchMessages();
  }, [room._id, userId]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setText(value);

    if (value.trim()) {
      startTyping(username);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        stopTyping(username);
      }, 1000);
    } else {
      stopTyping(username);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    sendMessage(text.trim());
    setText("");
    stopTyping(username);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-50">
      {/* Chat Header */}
      <div className="h-16 px-4 md:px-6 bg-white border-b border-gray-200 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-10 w-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            {room?.roomName?.charAt(0)?.toUpperCase() || "C"}
          </div>

          <div className="min-w-0">
            <h2 className="font-bold text-gray-800 truncate">
              {room.roomName}
            </h2>

            <div className="h-4">
              {typingUsers.length > 0 ? (
                <span className="text-xs text-green-600">
                  {typingUsers.join(", ")}{" "}
                  {typingUsers.length > 1 ? "are" : "is"} typing...
                </span>
              ) : (
                <span className="text-xs text-gray-400">
                  Secure conversation
                </span>
              )}
            </div>
          </div>
        </div>

        {room.roomType === "private" && room.createdBy === userId && (
          <button
            onClick={() => setShowManageModal(true)}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full font-medium hover:bg-purple-100 transition"
          >
            <IoPeopleOutline />
            Manage
          </button>
        )}
      </div>

      <MessageList messages={messages} userId={userId} />

      {/* Message Input */}
      <form
        onSubmit={handleSend}
        className="p-3 md:p-4 bg-white border-t border-gray-200 flex items-center gap-3"
      >
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white transition"
        />

        <button
          type="submit"
          className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-700 text-white flex items-center justify-center hover:opacity-90 transition shadow-md"
        >
          <IoSend className="text-xl" />
        </button>
      </form>

      {showManageModal && (
        <ManageMembersModal
          roomId={room._id}
          onClose={() => setShowManageModal(false)}
        />
      )}
    </div>
  );
};

export default ChatArea;