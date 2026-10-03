import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { GetSingleFriend } from "../../services/friend.api";
import { GetChatList } from "../../services/message.api";

const ChatLayout = () => {
  const { id } = useParams(); // friend ki id
  const [friend, setFriend] = useState(null);
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const loadFriend = async () => {
      try {
        const res = await GetSingleFriend(id);
        console.log(res.data)
        setFriend(res.data?.friend);
      } catch (error) {
        console.log("Failed to find friend", error);
      }
    };

    const loadChat = async () => {
      try {
        const res = await GetChatList(id);

        setChat(res.data.data); // backend: { success, data: [...] }
      } catch (error) {
        console.log("Failed to find chats", error);
      }

    };

    setChat([]);      
    loadFriend();
    loadChat();
  }, [id]);      
  return (
    <div className="mx-auto flex h-[90vh] w-full flex-col overflow-hidden bg-[#f8f8ee] sm:h-[90vh] sm:max-w-[520px] sm:rounded-[36px] sm:border sm:border-[#d9d9d1] sm:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      <ChatHeader
        user={friend}
        isActive={friend?.isOnline}
        lastSeen={friend?.lastSeen}
      />
      <MessageList messages={chat} friendId={id} />

<MessageInput
  onSent={(newMessage) => {
    if (!newMessage) return;
    setChat((prev) => [...prev, newMessage]);
  }}
/>
    </div>
  );
};

export default ChatLayout;