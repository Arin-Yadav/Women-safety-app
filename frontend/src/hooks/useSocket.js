import { useCallback, useEffect, useRef } from "react";
import { io } from "socket.io-client";

export const useSocket = (
  roomId,
  userId,
  onMessageReceived,
  onTyping,
  onStopTyping,
  onSOSReceived,
) => {
  const socketRef = useRef(null);
  const callbacksRef = useRef({
    onMessageReceived,
    onTyping,
    onStopTyping,
    onSOSReceived,
  });

  useEffect(() => {
    callbacksRef.current = {
      onMessageReceived,
      onTyping,
      onStopTyping,
      onSOSReceived,
    };
  });

  useEffect(() => {
    const socket = io(`${import.meta.env.VITE_BASE_URL}`, {
      withCredentials: true,
    });
    socketRef.current = socket;

    socket.on("receiveMessage", (message) => {
      callbacksRef.current.onMessageReceived?.(message);
    });
    socket.on("userTyping", ({ username }) => {
      callbacksRef.current.onTyping?.(username);
    });
    socket.on("userStopTyping", ({ username }) => {
      callbacksRef.current.onStopTyping?.(username);
    });
    socket.on("receiveSOS", (data) => {
      callbacksRef.current.onSOSReceived?.(data);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  useEffect(() => {
    const socket = socketRef.current;

    if (!socket || !roomId) return undefined;

    socket.emit("joinRoom", roomId);
    return () => {
      socket.emit("leaveRoom", roomId);
    };
  }, [roomId]);

  const sendMessage = useCallback(
    (text) => {
      if (roomId && userId && socketRef.current) {
        const msg = { roomId, sender: userId, text };
        socketRef.current.emit("sendMessage", msg);
      }
    },
    [roomId, userId],
  );

  const startTyping = useCallback(
    (username) => {
      if (roomId && username) {
        socketRef.current?.emit("typing", { roomId, username });
      }
    },
    [roomId],
  );

  const stopTyping = useCallback(
    (username) => {
      if (roomId && username) {
        socketRef.current?.emit("stopTyping", { roomId, username });
      }
    },
    [roomId],
  );

  // SOS emitter
  const sendSOS = useCallback(
    (location) => {
      if (roomId && userId && socketRef.current) {
        socketRef.current.emit("sendSOS", { roomId, sender: userId, location });
      }
    },
    [roomId, userId],
  );

  return { sendMessage, startTyping, stopTyping, sendSOS };
};
