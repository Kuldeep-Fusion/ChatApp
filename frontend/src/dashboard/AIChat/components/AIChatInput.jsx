import { useState } from "react";
import { Send } from "lucide-react";

const AIChatInput = ({ onSend, loading }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim() || loading) return;

    onSend(text);
    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-end gap-2 rounded-2xl border border-gray-200 bg-gray-50 p-2 transition focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-500/10">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={loading}
            placeholder="Ask AI anything..."
            className="max-h-32 min-h-[40px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed"
          />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!text.trim() || loading}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-2 text-center text-[11px] text-gray-400">
          AI can make mistakes. Check important information.
        </p>
      </div>
    </div>
  );
};

export default AIChatInput;