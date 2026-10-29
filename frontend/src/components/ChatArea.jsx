import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useSocket } from "../hooks/useSocket";
import { IoSend, IoPeopleOutline } from "react-icons/io5";
import { CiLocationOn } from "react-icons/ci";
import ManageMembersModal from "./ManageMembersModal";

const MessageBubble = React.memo(({ msg, userId }) => {
  const isOwnMessage = msg?.sender?._id === userId;

  return (
    <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}>
      <div
        className={`relative px-4 py-3 rounded-2xl text-sm wrap-break-words shadow-sm ${
          isOwnMessage
            ? "bg-linear-to-r from-pink-500 to-purple-700 text-white rounded-br-md"
            : "bg-white text-gray-800 border border-gray-100 rounded-bl-md"
        } max-w-[85%] sm:max-w-[70%] md:max-w-[55%]`}>
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
          }`}>
          {!isOwnMessage && <span>{msg?.sender?.username}</span>}
          <span>{dayjs(msg?.createdAt).format("h:mm A")}</span>
        </div>
      </div>
    </div>
  );
});

const MessageList = React.memo(({ messages, userId, typingUsers }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typingUsers]);

  return (
    <div className="flex-1 overflow-y-auto bg-linear-to-b from-[#faf9ff] to-[#f6f5fb] px-3 py-5 sm:px-5 md:px-8">
      {messages.length > 0 ? (
        <div className="flex w-full flex-col gap-3">
          {messages.map((msg) => (
            <MessageBubble key={msg._id} msg={msg} userId={userId} />
          ))}
        </div>
      ) : (
        <div className="flex h-full min-h-56 flex-col items-center justify-center px-4 text-center">
          {/* <div className="grid h-16 w-16 place-items-center rounded-3xl border border-violet-100 bg-white text-2xl text-violet-500 shadow-sm">
            <IoPeopleOutline />
          </div> */}
          {/* <p className="mt-4 text-base font-bold text-slate-700">
            A fresh start
          </p> */}
          <p className="mt-1 max-w-xs text-sm leading-6 text-slate-400">
            Send a hello and let your group know you're here.
          </p>
        </div>
      )}

      {typingUsers.length > 0 && (
        <div className="mx-auto mt-3 flex max-w-4xl justify-start">
          <div
            role="status"
            aria-live="polite"
            className="inline-flex items-center gap-2 rounded-2xl rounded-bl-md border border-violet-100 bg-white px-4 py-3 text-xs font-medium text-slate-500 shadow-sm">
            <span className="font-semibold text-violet-700">
              {typingUsers.join(", ")}
            </span>
            <span>{typingUsers.length > 1 ? "are" : "is"} typing</span>
            <span className="flex items-center gap-0.5" aria-hidden="true">
              <span className="h-1 w-1 animate-bounce rounded-full bg-violet-500 [animation-delay:-0.2s]" />
              <span className="h-1 w-1 animate-bounce rounded-full bg-violet-500 [animation-delay:-0.1s]" />
              <span className="h-1 w-1 animate-bounce rounded-full bg-violet-500" />
            </span>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
});

const ChatArea = ({ room }) => {
  const fullUser = useSelector((state) => state.user);
  const user = fullUser?.user?.user;
  const userId = user?.id;
  const username = user?.username || user?.fullName;

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
    (typingUsername) => {
      if (typingUsername) {
        setTypingUsers((prev) =>
          prev.includes(typingUsername) ? prev : [...prev, typingUsername],
        );
      }
    },
    (typingUsername) =>
      setTypingUsers((prev) => prev.filter((user) => user !== typingUsername)),
  );

  useEffect(() => {
    let active = true;
    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/messages/${room._id}`,
          { params: { userId }, withCredentials: true },
        );

        if (active) setMessages(res.data.messages || []);
      } catch (error) {
        if (active) console.error("Fetch Messages Error:", error);
      }
    };

    if (room?._id) fetchMessages();
    return () => {
      active = false;
    };
  }, [room._id, userId]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      stopTyping(username);
    };
  }, [room._id, stopTyping, username]);

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
        typingTimeoutRef.current = null;
      }, 1000);
    } else {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
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
      typingTimeoutRef.current = null;
    }
  };

  return (
    <div className="flex h-full min-w-0 flex-col bg-white">
      <div className="flex min-h-18 items-center justify-between gap-3 border-b border-violet-100 bg-white/95 px-3 shadow-[0_4px_18px_rgba(47,32,89,0.035)] sm:px-5 md:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-linear-to-br from-fuchsia-500 to-violet-700 font-extrabold text-white shadow-md shadow-violet-200">
            {room?.roomName?.charAt(0)?.toUpperCase() || "C"}
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-sm font-extrabold text-slate-800 sm:text-base">
              {room.roomName}
            </h2>
            <p
              aria-live="polite"
              className="mt-0.5 flex items-center gap-1.5 truncate text-[11px] text-slate-400 sm:text-xs">
              {typingUsers.length > 0 ? (
                <>
                  <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-emerald-500" />
                  <span className="truncate font-medium text-emerald-700">
                    {typingUsers.join(", ")}{" "}
                    {typingUsers.length > 1 ? "are" : "is"} typing...
                  </span>
                </>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                  <span>
                    {room.roomType === "private"
                      ? "Private group"
                      : "Your community"}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>

        {room.roomType === "private" && room.createdBy === userId && (
          <button
            onClick={() => setShowManageModal(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-full cursor-pointer border border-violet-100 bg-violet-50 px-3 py-2 text-xs font-bold text-violet-700 transition hover:bg-violet-100 focus-visible:outline-2 focus-visible:outline-violet-500 sm:px-4 sm:text-sm">
            <IoPeopleOutline />
            <span className="hidden sm:inline">Manage</span>
          </button>
        )}
      </div>

      <MessageList
        messages={messages}
        userId={userId}
        typingUsers={typingUsers}
      />

      <form
        onSubmit={handleSend}
        className="flex items-center gap-2 border-t border-violet-100 bg-white px-3 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:gap-3 sm:px-5 md:px-7">
        <input
          type="text"
          value={text}
          onChange={handleInputChange}
          placeholder="Type a message..."
          aria-label="Type a message"
          className="min-w-0 flex-1 rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-100 sm:px-5"
        />

        <button
          type="submit"
          aria-label="Send message"
          disabled={!text.trim()}
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-linear-to-r from-fuchsia-600 to-violet-700 text-white shadow-md shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0">
          <IoSend className="text-lg" />
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
