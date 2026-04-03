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
        className={`max-w-[75%] px-0 py-2 text-sm ${
          isOwnMessage
            ? "text-slate-900 dark:text-white"
            : "text-slate-700 dark:text-slate-300"
        }`}
      >
        {msg?.type === "location" ? (
          <>
            <p>{msg?.sender?.username} shared live location</p>
            <div className="mt-2">
              <iframe
                src={`https://maps.google.com/maps?q=${msg.lat},${msg.lng}&z=15&output=embed`}
                className="h-56 w-full"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </>
        ) : (
          <p className="whitespace-pre-wrap">{msg?.text}</p>
        )}

        <div className="mt-1 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span>{msg?.sender?.username}</span>
          <span>{dayjs(msg?.createdAt).format("h:mm A")}</span>
        </div>
      </div>
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

  const { sendMessage, startTyping, stopTyping } = useSocket(
    room._id,
    userId,
    (message) => {
      setMessages((prev) => [...prev, message]);
    },
    (incomingUsername) =>
      setTypingUsers((prev) => [...new Set([...prev, incomingUsername])]),
    (incomingUsername) =>
      setTypingUsers((prev) => prev.filter((u) => u !== incomingUsername)),
  );

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
    <div>
      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{room.roomName}</h2>
      {typingUsers.length > 0 && (
        <p className="mt-2 text-sm text-green-600">
          {typingUsers.join(", ")} {typingUsers.length > 1 ? "are" : "is"} typing...
        </p>
      )}

      <div className="mt-8 space-y-6">
        {messages.map((msg) => (
          <MessageBubble key={msg._id} msg={msg} userId={userId} />
        ))}
      </div>

      <form onSubmit={handleSend} className="mt-10 flex items-center gap-3">
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="Type a message"
          className="flex-1 border-b border-slate-300 bg-transparent px-0 py-2 focus:outline-none dark:border-slate-700 dark:text-white"
        />
        <button
          type="submit"
          className="rounded-md bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatArea;
