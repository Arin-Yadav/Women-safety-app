import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSocket } from "../hooks/useSocket";
import axios from "axios";
import dayjs from "dayjs";

const MessageBubble = React.memo(({ msg, userId }) => {
  const isOwnMessage = msg?.sender?._id === userId;

  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative px-3 py-2 rounded-lg text-sm wrap-break-word ${
          isOwnMessage
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        } max-w-[75%] sm:max-w-[60%] md:max-w-[50%]`}>
        {/* Handle location vs text */}
        {msg?.type === "location" ? (
          <>
            <p>{msg?.sender?.username} shared live location</p>
            <div className="mt-2 w-full">
              {/* Responsive iframe wrapper */}
              <div className="relative w-full pb-[75%] max-h-64 rounded-lg overflow-hidden">
                <iframe
                  src={`https://maps.google.com/maps?q=${msg.lat},${msg.lng}&z=15&output=embed`}
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"></iframe>
              </div>
            </div>
          </>
        ) : (
          <p className="whitespace-pre-wrap">{msg?.text}</p>
        )}

        <div className="flex gap-2 justify-between items-center mt-1 text-xs opacity-70">
          <span>{msg?.sender?.username}</span>
          <span>{dayjs(msg?.createdAt).format("h:mm A")}</span>
        </div>
      </div>
    </div>
  );
});

// Messages list
const MessageList = React.memo(({ messages, userId }) => {
  const bottomRef = React.useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
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

  // Socket hook
  const { sendMessage, startTyping, stopTyping } = useSocket(
    room._id,
    userId,
    (message) => {
      setMessages((prev) => [...prev, message]);
    },
    (username) => setTypingUsers((prev) => [...new Set([...prev, username])]),
    (username) => setTypingUsers((prev) => prev.filter((u) => u !== username)),
  );

  // Fetch history when room changes
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/messages/${room._id}`,
          { withCredentials: true },
        );
        setMessages(res.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    if (room?._id) fetchMessages();
  }, [room]);

  const handleInputChange = (e) => {
    let typingTimeout;
    const value = e.target.value;
    setText(value);

    if (value) {
      startTyping(username);
      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => stopTyping(username), 1000);
    } else {
      stopTyping(username);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    sendMessage(text);
    setText("");
    stopTyping(username);
  };

  return (
    <div className="flex flex-col h-full w-full bg-gray-100">
      <div className="p-4 bg-white border-b flex items-center h-16">
        <div className="flex flex-col justify-center">
          <h2 className="font-semibold text-sm">Chatting in {room.roomName}</h2>
          <div className="h-4">
            {typingUsers.length > 0 && (
              <span className="text-xs text-green-500">
                {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"}{" "}
                typing...
              </span>
            )}
          </div>
        </div>
      </div>

      <MessageList messages={messages} userId={userId} />

      <form
        onSubmit={handleSend}
        className="p-4 bg-white border-t flex items-center gap-2">
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="Type a message"
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatArea;
