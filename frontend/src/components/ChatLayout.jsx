import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatArea from "./ChatArea";

const ChatLayout = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <div className="space-y-10">
      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Chat
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-slate-900 dark:text-white">
          Conversations
        </h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div>
          <ChatSidebar onSelectRoom={setSelectedRoom} isOpen onClose={() => {}} />
        </div>

        <div>
          {!selectedRoom ? (
            <p className="text-base text-slate-600 dark:text-slate-300">
              Select a group to start chatting.
            </p>
          ) : (
            <ChatArea room={selectedRoom} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
