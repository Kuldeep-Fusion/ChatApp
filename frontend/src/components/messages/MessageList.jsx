import { useEffect, useState, useCallback, useMemo } from "react";
import { SearchIcon, XIcon } from "@animateicons/react/lucide";

import { useAuth } from "../../context/AuthContext";
import MessageCard from "./MessageCard";
import { GetChatListAll } from "../../services/message.api";
import { DeleteConversation } from "../../services/conversation.api";

const MessageList = () => {
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentUserId = user?._id;

  const handleFetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await GetChatListAll();
      const conversations = res?.data?.data || [];

      const formattedData = conversations
        .map((conversation) => {
          const otherUser = conversation.participants?.find(
            (participant) =>
              participant?._id?.toString() !== currentUserId?.toString()
          );

          if (!otherUser) return null;

          return {
            conversationId: conversation._id,
            userId: otherUser._id,
            name: otherUser.name || "Unknown User",
            avatar: otherUser.avatar || "",
            lastMessage:
              conversation.lastMessage?.content ||
              conversation.lastMessage?.text ||
              "Media",
            time: conversation.lastMessageAt
              ? new Date(conversation.lastMessageAt).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "",
            unread: conversation.unreadCount || 0,
            online: Boolean(otherUser.online),
          };
        })
        .filter(Boolean);

      setData(formattedData);
    } catch (error) {
      console.error("Chat list error:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [currentUserId]);

  // =====================================================
  // DELETE CONVERSATION (OPTIMISTIC UPDATE)
  // =====================================================
  const handleDeleteConversation = useCallback(async (conversationId) => {
    if (!conversationId) return;
    let previousData;
    setData((prev) => {
      previousData = prev;
      return prev.filter((item) => item.conversationId !== conversationId);
    });

    try {
      await DeleteConversation(conversationId);
    } catch (error) {
      console.error("Delete conversation error:", error);
      // Rollback UI state if delete failed
      if (previousData) setData(previousData);
    }
  }, []);

  // =====================================================
  // INITIAL FETCH
  // =====================================================
  useEffect(() => {
    if (currentUserId) {
      handleFetchData();
    }
  }, [currentUserId, handleFetchData]);

  // =====================================================
  // FILTERED DATA (MEMOIZED)
  // =====================================================
  const filteredMessages = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return data;

    return data.filter((item) =>
      item.name?.toLowerCase().includes(query)
    );
  }, [data, search]);

  // =====================================================
  // SKELETON LOADING STATE
  // =====================================================
  if (loading) {
    return (
      <section className="flex h-full w-full flex-col p-4 space-y-4 animate-pulse">
        <div className="h-8 w-1/3 rounded-md bg-gray-200" />
        <div className="h-10 w-full rounded-xl bg-gray-200" />
        <div className="space-y-3 pt-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-1/2 rounded bg-gray-200" />
                <div className="h-3 w-3/4 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // =====================================================
  // UI
  // =====================================================
  return (
    <section className="flex h-full min-h-0 w-full flex-col p-2">
      {/* HEADER */}
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
        </div>

        {/* SEARCH BAR */}
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

          {search && (
            <button
              onClick={() => setSearch("")}
              type="button"
              className="text-[#9aa59f] hover:text-[#35433b] transition"
              aria-label="Clear search"
            >
              <XIcon size={15} />
            </button>
          )}
        </div>
      </header>

      {/* CONVERSATION LIST */}
      <div className="min-h-0 flex-1 overflow-y-auto px-2 py-2">
        {filteredMessages.length > 0 ? (
          <div className="space-y-0.5">
            {filteredMessages.map((conversation) => (
              <MessageCard
                key={conversation.conversationId}
                conversationId={conversation.conversationId}
                userId={conversation.userId}
                avatar={conversation.avatar}
                name={conversation.name}
                lastMessage={conversation.lastMessage}
                time={conversation.time}
                unread={conversation.unread}
                online={conversation.online}
                onDelete={handleDeleteConversation}
              />
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="flex h-full min-h-[250px] flex-col items-center justify-center px-6 text-center">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#f0f5f1] text-[#6d8175]">
              <SearchIcon size={19} duration={0.6} />
            </div>

            <h3 className="text-[13px] font-medium text-[#35433b]">
              No conversations found
            </h3>

            <p className="mt-1 max-w-[220px] text-[11px] leading-5 text-[#9aa59f]">
              {search
                ? "Try searching with a different name."
                : "You don't have any conversations yet."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MessageList;