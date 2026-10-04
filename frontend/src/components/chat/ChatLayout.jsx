import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

import { GetSingleFriend } from "../../services/friend.api";
import { GetChatList } from "../../services/message.api";
import { useSocket } from "../../context/SocketProvider";

const ChatLayout = () => {
  const { id } = useParams();

  const socket = useSocket();

  const [friend, setFriend] = useState(null);
  const [chat, setChat] = useState([]);

  // --------------------------------
  // Load Friend + Old Messages
  // --------------------------------
  useEffect(() => {
    const loadFriend = async () => {
      try {
        const res = await GetSingleFriend(id);

        console.log("Friend:", res.data);

        setFriend(res.data?.friend);
      } catch (error) {
        console.log("Failed to find friend:", error);
      }
    };

    const loadChat = async () => {
      try {
        const res = await GetChatList(id);

        console.log("Chat:", res.data);

        setChat(res.data?.data || []);
      } catch (error) {
        console.log("Failed to find chats:", error);
      }
    };

    setChat([]);

    loadFriend();
    loadChat();
  }, [id]);

  // --------------------------------
  // Receive Live Message
  // --------------------------------
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      console.log("📩 Live message received:", newMessage);

      const senderId =
        newMessage?.sender?._id ||
        newMessage?.sender;

      if (senderId?.toString() === id?.toString()) {
        setChat((prev) => [...prev, newMessage]);
      }
    };

    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, [socket, id]);

  // --------------------------------
  // FRIEND ONLINE / OFFLINE
  // --------------------------------
  useEffect(() => {
    if (!socket) return;

    // Friend came online
    const handleUserOnline = ({ userId }) => {
      console.log("🟢 User online:", userId);

      if (userId?.toString() !== id?.toString()) {
        return;
      }

      setFriend((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          isOnline: true,
        };
      });
    };

    // Friend went offline
    const handleUserOffline = ({ userId, lastActive }) => {
      console.log("🔴 User offline:", userId);

      if (userId?.toString() !== id?.toString()) {
        return;
      }

      setFriend((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          isOnline: false,
          lastActive,
        };
      });
    };

    socket.on("user-online", handleUserOnline);
    socket.on("user-offline", handleUserOffline);

    return () => {
      socket.off("user-online", handleUserOnline);
      socket.off("user-offline", handleUserOffline);
    };
  }, [socket, id]);

  // --------------------------------
  // Message Sent
  // --------------------------------
  const handleMessageSent = (newMessage) => {
    if (!newMessage) return;

    setChat((prev) => [...prev, newMessage]);
  };

  return (
    <div
      className="
        mx-auto
        flex
        h-[90vh]
        w-full
        flex-col
        overflow-hidden
        bg-[#f8f8ee]
        sm:h-[90vh]
        sm:max-w-[520px]
        sm:rounded-[36px]
        sm:border
        sm:border-[#d9d9d1]
        sm:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
      "
    >
      {/* Header */}
      <ChatHeader
  user={friend}
  isActive={friend?.isOnline}
  lastSeen={friend?.lastSeen}
/>

      {/* Messages */}
      <MessageList
        messages={chat}
        friendId={id}
      />

      {/* Input */}
      <MessageInput
        onSent={handleMessageSent}
      />
    </div>
  );
};

export default ChatLayout;