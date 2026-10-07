import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext.jsx";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export function SocketProvider({ children }) {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user) {
      setSocket(null);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      console.log("❌ Socket: access token not found");
      return;
    }

    const s = io(import.meta.env.VITE_SOCKET_URL, {
      auth: {
        token,
      },
      transports: ["websocket"],
    });

    s.on("connect", () => {
      console.log("🟢 Socket connected:", s.id);
    });

    s.on("disconnect", (reason) => {
      console.log("🔴 Socket disconnected:", reason);
    });

    s.on("connect_error", (error) => {
      console.log("❌ Socket connection error:", error.message);
    });

    setSocket(s);

    return () => {
      s.disconnect();
      setSocket(null);
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}