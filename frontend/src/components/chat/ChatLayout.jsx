import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GooeyToaster, gooeyToast } from "goey-toast";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

import { GetSingleFriend } from "../../services/friend.api";
import {
  DeleteSingleMessage,
  GetChatList,
  UpdateMessage,
} from "../../services/message.api";

import { useSocket } from "../../context/SocketProvider";

const ChatLayout = () => {
  const { id } = useParams();
  const socket = useSocket();

  const [friend, setFriend] = useState(null);
  const [chat, setChat] = useState([]);
  const [editingMessage, setEditingMessage] = useState(null);

 
  // LOAD FRIEND + CHAT
 
  useEffect(() => {
    if (!id) return;

    const loadData = async () => {
      try {
        setChat([]);
        setEditingMessage(null);

        const [friendRes, chatRes] = await Promise.all([
          GetSingleFriend(id),
          GetChatList(id),
        ]);

        console.log("Friend:", friendRes.data);
        console.log("Chat:", chatRes.data);

        setFriend(friendRes.data?.friend || null);
        setChat(chatRes.data?.data || []);
      } catch (error) {
        console.error(
          "Failed to load chat:",
          error?.response?.data || error
        );
      }
    };

    loadData();
  }, [id]);

 
  // LIVE NEW MESSAGE
 
  useEffect(() => {
    if (!socket || !id) return;

    const handleNewMessage = (newMessage) => {
      console.log("📩 Live message received:", newMessage);

      const senderId =
        newMessage?.sender?._id ||
        newMessage?.sender;

      // Only add messages from current friend
      if (String(senderId) !== String(id)) {
        return;
      }

      setChat((prev) => {
        // Prevent duplicate messages
        const alreadyExists = prev.some(
          (message) =>
            String(message._id) === String(newMessage._id)
        );

        if (alreadyExists) {
          return prev;
        }

        return [...prev, newMessage];
      });
    };

    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, [socket, id]);

 
  // LIVE MESSAGE UPDATE
 
  useEffect(() => {
    if (!socket || !id) return;

    const handleMessageUpdated = (updatedMessage) => {
      console.log("✏️ Live message updated:", updatedMessage);

      if (!updatedMessage?._id) return;

      setChat((prev) =>
        prev.map((message) =>
          String(message._id) === String(updatedMessage._id)
            ? {
                ...message,
                ...updatedMessage,
                isEdited: true,
              }
            : message
        )
      );
    };

    socket.on("message-updated", handleMessageUpdated);

    return () => {
      socket.off("message-updated", handleMessageUpdated);
    };
  }, [socket, id]);

 
  // LIVE MESSAGE DELETE
 
  useEffect(() => {
    if (!socket || !id) return;

    const handleMessageDeleted = ({ messageId }) => {
      console.log("🗑️ Live message deleted:", messageId);

      if (!messageId) return;

      setChat((prev) =>
        prev.filter(
          (message) =>
            String(message._id) !== String(messageId)
        )
      );

      // If deleted message is currently being edited
      setEditingMessage((prev) => {
        if (!prev) return null;

        return String(prev._id) === String(messageId)
          ? null
          : prev;
      });
    };

    socket.on("message-deleted", handleMessageDeleted);

    return () => {
      socket.off("message-deleted", handleMessageDeleted);
    };
  }, [socket, id]);

 
  // FRIEND ONLINE / OFFLINE
 
  useEffect(() => {
    if (!socket || !id) return;

    const handleUserOnline = ({ userId }) => {
      console.log("🟢 User online:", userId);

      if (String(userId) !== String(id)) return;

      setFriend((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          isOnline: true,
        };
      });
    };

    const handleUserOffline = ({ userId, lastActive }) => {
      console.log("🔴 User offline:", userId);

      if (String(userId) !== String(id)) return;

      setFriend((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          isOnline: false,
          lastActive,
          lastSeen: lastActive,
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

 
  // MESSAGE SENT
 
  const handleMessageSent = (newMessage) => {
    if (!newMessage?._id) return;

    setChat((prev) => {
      const alreadyExists = prev.some(
        (message) =>
          String(message._id) === String(newMessage._id)
      );

      if (alreadyExists) {
        return prev;
      }

      return [...prev, newMessage];
    });
  };

 
  // START EDIT
 
  const handleEditMessage = (message) => {
    console.log("✏️ Editing message:", message);

    setEditingMessage(message);
  };

 
  // CANCEL EDIT
 
  const handleCancelEdit = () => {
    setEditingMessage(null);
  };

 
  // EDIT MESSAGE

  const handleEditSubmit = async ({ id: messageId, content }) => {
    if (!messageId || !content?.trim()) return;

    try {
      const res = await UpdateMessage(messageId, {
        content: content.trim(),
      });

      console.log("✏️ Updated message:", res.data);

      const updatedMessage =
        res.data?.message ||
        res.data?.data ||
        res.data;

      // Immediately update UI
      setChat((prev) =>
        prev.map((message) =>
          String(message._id) === String(messageId)
            ? {
                ...message,
                ...(updatedMessage || {}),
                content: content.trim(),
                isEdited: true,
              }
            : message
        )
      );

      setEditingMessage(null);

      gooeyToast.success("Message edited successfully");
    } catch (error) {
      console.error(
        "Update message failed:",
        error?.response?.data || error
      );

      gooeyToast.error(
        error?.response?.data?.message ||
          "Failed to edit message"
      );
    }
  };

  // DELETE MESSAGE

  const handleDeleteMessage = async ({ id: messageId }) => {
    if (!messageId) return;

    try {
      await gooeyToast.promise(
        DeleteSingleMessage(messageId),
        {
          loading: "Deleting message...",
          success: "Message deleted successfully",
          error: "Message Deleted",
        }
      );

      // Immediately remove from UI
      setChat((prev) =>
        prev.filter(
          (message) =>
            String(message._id) !== String(messageId)
        )
      );

      // If deleted message was being edited
      setEditingMessage((prev) => {
        if (!prev) return null;

        return String(prev._id) === String(messageId)
          ? null
          : prev;
      });
    } catch (error) {
      console.error(
        "Delete message failed:",
        error?.response?.data || error
      );
    }
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
        sm:max-w-[520px]
        sm:rounded-[36px]
        sm:border
        sm:border-[#d9d9d1]
        sm:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
      "
    >
      <GooeyToaster position="top-center" />

      {/* Header */}
      <ChatHeader
        user={friend}
        isActive={friend?.isOnline}
        lastSeen={friend?.lastSeen || friend?.lastActive}
      />

      {/* Messages */}
      <MessageList
        messages={chat}
        friendId={id}
        onEditMessage={handleEditMessage}
        onDeleteMessage={handleDeleteMessage}
      />

      {/* Input */}
      <MessageInput
        onSent={handleMessageSent}
        editingMessage={editingMessage}
        onCancelEdit={handleCancelEdit}
        onEditSubmit={handleEditSubmit}
      />
    </div>
  );
};

export default ChatLayout;