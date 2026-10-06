
import { Sparkles, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { DeleteAiChatHistory } from "../../../services/ai.api";
import { gooeyToast, GooeyToaster } from "goey-toast";

const AIChatHeader = ({ onDeleteSuccess }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);

      const res = await DeleteAiChatHistory();

      if (res?.data?.success) {
        // Clear chat UI immediately
        onDeleteSuccess?.();

        gooeyToast.success("All AI chats deleted successfully");
      }
    } catch (error) {
      console.error("Delete AI history error:", error);

      gooeyToast.error(
        error?.response?.data?.message ||
          "Failed to delete AI chats"
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3.5 sm:px-6">
      <GooeyToaster position="top-center" closeOnEscape={false} />

      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100">
          <Sparkles className="h-5 w-5 text-green-600" />
        </div>

        <div>
          <h1 className="text-sm font-semibold text-gray-900">
            Chat With Ai
          </h1>

          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

            <span className="text-xs text-gray-500">
              Always available
            </span>
          </div>
        </div>
      </div>

      {/* Delete All */}
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        aria-label="Delete all chats"
        title="Delete all chats"
        className="
          flex h-9 w-9 items-center justify-center
          rounded-full bg-red-50 text-red-500
          transition-all
          hover:bg-red-100
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {deleting ? (
          <Loader2 className="h-[18px] w-[18px] animate-spin" />
        ) : (
          <Trash2 className="h-[18px] w-[18px]" />
        )}
      </button>

    </header>
  );
};

export default AIChatHeader;
