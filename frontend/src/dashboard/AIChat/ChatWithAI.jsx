
import { useEffect, useState } from "react";

import MessageChatAI from "./components/MessageChatAI";
import AIChatHeader from "./components/AIChatHeader";
import AIChatInput from "./components/AIChatInput";

import {
  AskToAi,
  GetAiChatHistory,
} from "../../services/ai.api";

const ChatWithAI = () => {
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);


  // FETCH OLD AI HISTORY
  useEffect(() => {
    const fetchAIHistory = async () => {
      try {
        setHistoryLoading(true);

        const res = await GetAiChatHistory();

        const history = res?.data?.data || [];

        const formattedMessages = [];

        history
          .slice()
          .reverse()
          .forEach((chat) => {
            // User message
            formattedMessages.push({
              id: `${chat._id}-question`,
              text: chat.question,
              sender: "user",
              time: new Date(chat.createdAt),
            });

            // AI message
            formattedMessages.push({
              id: `${chat._id}-response`,
              text: chat.response,
              sender: "ai",
              time: new Date(chat.createdAt),
            });
          });

        // If no previous chat
        if (formattedMessages.length === 0) {
          setMessages([
            {
              id: "welcome-message",
              text: "Hey! 👋 I'm your AI assistant. How can I help you today?",
              sender: "ai",
              time: new Date(),
            },
          ]);
        } else {
          setMessages(formattedMessages);
        }
      } catch (error) {
        console.error("AI history error:", error);

        setMessages([
          {
            id: "welcome-message",
            text: "Hey! 👋 I'm your AI assistant. How can I help you today?",
            sender: "ai",
            time: new Date(),
          },
        ]);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchAIHistory();
  }, []);


  // ASK AI
  const handleSend = async (text) => {
    if (!text.trim() || loading) return;

    const question = text.trim();

    // Immediately show user message
    const userMessage = {
      id: `user-${Date.now()}`,
      text: question,
      sender: "user",
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const res = await AskToAi(question);

      /*
        Backend response:

        {
          success: true,
          message: "AI response generated successfully",
          data: {
            _id,
            user,
            question,
            response,
            createdAt
          }
        }
      */

      const chat = res?.data?.data;

      if (!chat?.response) {
        throw new Error("AI response not found");
      }

      const aiMessage = {
        id: `${chat._id}-response`,
        text: chat.response,
        sender: "ai",
        time: new Date(chat.createdAt),
      };

      // Add AI response
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI chat error:", error);

      const errorMessage = {
        id: `error-${Date.now()}`,
        text: "Sorry, I couldn't generate a response. Please try again.",
        sender: "ai",
        time: new Date(),
        error: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[90dvh] flex-col overflow-hidden">
      <AIChatHeader onDeleteSuccess={() => setMessages([])} />

      {/* =========================
          MESSAGES
      ========================= */}
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">

          {/* History Loading */}
          {historyLoading ? (
            <MessageChatAI
              message={{
                id: "history-loading",
                sender: "ai",
                loading: true,
              }}
            />
          ) : (
            <>
              {messages.map((message) => (
                <MessageChatAI
                  key={message.id}
                  message={message}
                />
              ))}

              {/* AI Response Loading */}
              {loading && (
                <MessageChatAI
                  message={{
                    id: "ai-loading",
                    sender: "ai",
                    loading: true,
                  }}
                />
              )}
            </>
          )}

        </div>
      </div>

      {/* =========================
          INPUT
      ========================= */}
      <AIChatInput
        onSend={handleSend}
        loading={loading || historyLoading}
      />
    </div>
  );
};

export default ChatWithAI;
