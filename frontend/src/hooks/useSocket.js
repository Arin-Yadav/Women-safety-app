import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const useSocket = (
  roomId,
  userId,
  onMessageReceived,
  onTyping,
  onStopTyping,
  onSOSReceived // new callback
) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(`${import.meta.env.VITE_BASE_URL}`);
    }

    const socket = socketRef.current;

    if (roomId) {
      socket.emit("joinRoom", roomId);
    }

    socket.on("receiveMessage", (message) => {
      if (onMessageReceived) {
        onMessageReceived(message); // callback to update local state
      }
    });

    socket.on("userTyping", ({ username }) => {
      onTyping?.(username);
    });

    socket.on("userStopTyping", ({ username }) => {
      onStopTyping?.(username);
    });

    // 👇 SOS listener
    socket.on("receiveSOS", (data) => {
      onSOSReceived?.(data);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userTyping");
      socket.off("userStopTyping");
      socket.off("receiveSOS");
    };
  }, [roomId, userId, onMessageReceived, onTyping, onStopTyping, onSOSReceived]);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const sendMessage = (text) => {
    if (roomId && userId && socketRef.current) {
      const msg = { roomId, sender: userId, text };
      socketRef.current.emit("sendMessage", msg);
    }
  };

  const startTyping = (username) => {
    socketRef.current?.emit("typing", { roomId, username });
  };

  const stopTyping = (username) => {
    socketRef.current?.emit("stopTyping", { roomId, username });
  };

  // 👇 SOS emitter
  const sendSOS = (location) => {
    if (roomId && userId && socketRef.current) {
      socketRef.current.emit("sendSOS", { roomId, sender: userId, location });
    }
  };

  return { sendMessage, startTyping, stopTyping, sendSOS };
};
