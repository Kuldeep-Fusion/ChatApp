import { Sparkles } from "lucide-react";

const MessageChatAI = ({ message }) => {
  const isUser = message.sender === "user";

  if (message.loading) {
    return (
      <div className="flex items-end gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
          <img src="/logo.png" alt="Milan Chat" className="rounded-sm w-full" />
        </div>

        <div className="rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm">
          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-end gap-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
           <img src="/logo.png" alt="Milan Chat" className="rounded-sm w-full" />
        </div>
      )}

      <div
        className={`max-w-[80%] px-4 py-3 text-sm leading-6 sm:max-w-[70%] ${
          isUser
            ? "rounded-2xl rounded-br-md bg-green-600 text-white"
            : "rounded-2xl rounded-bl-md bg-white text-gray-800 shadow-sm"
        }`}
      >
        <p>{message.text}</p>

        {message.time && (
          <p
            className={`mt-1 text-[10px] ${
              isUser ? "text-green-100" : "text-gray-400"
            }`}
          >
            {new Date(message.time).toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        )}
      </div>
    </div>
  );
};

export default MessageChatAI;