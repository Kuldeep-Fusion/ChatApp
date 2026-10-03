 import { useEffect, useRef } from "react";
import MessageCard from "./MessageCard";

const MessageList = ({ messages, friendId }) => {
  const bottomRef = useRef(null);

  // Naya message aane par neeche scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <main className="flex-1 overflow-y-auto px-5 pb-5 pt-4 scrollbar-thin">
      <div className="space-y-2.5">
        {messages.map((message) => (
           <MessageCard key={message._id} message={message} friendId={friendId} />
        ))}
      </div>

      <div ref={bottomRef} />
    </main>
  );
};

export default MessageList;