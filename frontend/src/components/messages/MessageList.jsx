import { useEffect, useState } from "react";

import {
  SearchIcon,
  PlusIcon,
  Link,
} from "@animateicons/react/lucide";

import { useAuth } from "../../context/AuthContext";
import MessageCard from "./MessageCard";
import { GetChatListAll } from "../../services/message.api";

const MessageList = () => {
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  const currentUserId = user?._id;

  const handleFetchData = async () => {
    try {
      const res = await GetChatListAll();

      const conversations = res.data?.data || [];

      const formattedData = conversations.map((conversation) => {
        const otherUser = conversation.participants?.find(
          (participant) => participant._id !== currentUserId
        );

        return {
          id: conversation._id,
          userId: otherUser?._id,
          name: otherUser?.name || "Unknown User",
          avatar: otherUser?.avatar || "",

          lastMessage:
            conversation.lastMessage?.content ||
            conversation.lastMessage?.text ||
            "Media",

          time: conversation.lastMessageAt
            ? new Date(
                conversation.lastMessageAt
              ).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : "",
        };
      });

      setData(formattedData);
    } catch (error) {
      console.log("Chat list error:", error);
      setData([]);
    }
  };

  useEffect(() => {
    if (currentUserId) {
      handleFetchData();
    }
  }, [currentUserId]);

  const filteredMessages = data.filter((conversation) =>
    conversation.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <section className="flex h-full min-h-0 w-full flex-col p-2">
      {/* Header */}
      <header className="shrink-0 border-b border-[#edf1ee] px-4 pb-4 pt-5 sm:px-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[21px] font-semibold tracking-[-0.035em] text-[#17251e]">
              Messages
            </h1>

            <p className="mt-0.5 text-[11px] text-[#8b9690]">
              Your conversations
            </p>
          </div>

          <button
            type="button"
            aria-label="New message"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#183326] text-[#d9f99d] transition hover:bg-[#244936] active:scale-95"
          >
            <PlusIcon size={18} duration={0.6} />
          </button>
        </div>

        {/* Search */}
        <div className="group mt-4 flex h-10 items-center rounded-xl bg-[#f4f7f5] px-3 transition focus-within:bg-[#eef3ef]">
          <SearchIcon
            size={17}
            duration={0.6}
            className="mr-2.5 shrink-0 text-[#9aa59f]"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations"
            className="h-full min-w-0 flex-1 bg-transparent text-[13px] text-[#26342d] outline-none placeholder:text-[#a2aaa6]"
          />
        </div>
      </header>

      {/* Conversation List */}
      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        {filteredMessages.length > 0 ? (
          <div className="space-y-0.5">
            {filteredMessages.map((conversation) => (
              <MessageCard
                key={conversation.id}
                {...conversation}
              />
            ))}
          </div>
        ) : (
          <div className="flex h-full min-h-[250px] flex-col items-center justify-center px-6 text-center">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0f5f1] text-[#6d8175]">
              <SearchIcon size={19} duration={0.6} />
            </div>

            <h3 className="text-[13px] font-medium text-[#35433b]">
              No conversations found
            </h3>

            <p className="mt-1 max-w-[220px] text-[11px] leading-5 text-[#9aa59f]">
              Try searching with a different name.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MessageList;