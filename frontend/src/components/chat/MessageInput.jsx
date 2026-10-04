import {
  Smile,
  Paperclip,
  Mic,
  Send,
  X,
} from "lucide-react";

import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { SendMessage } from "../../services/message.api";
import { useSocket } from "../../context/SocketProvider";

const MessageInput = ({ onSent }) => {
  const { id } = useParams();

  // SocketProvider se direct socket
  const socket = useSocket();

  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [sending, setSending] = useState(false);

  const fileInputRef = useRef(null);

  const canSend =
    (message.trim() || file) && !sending;

  // --------------------------------
  // File Select
  // --------------------------------
  const handleChange = (e) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(selected);

    if (selected.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(selected);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  };

  // --------------------------------
  // Remove File
  // --------------------------------
  const cancelSelection = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setFile(null);
    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // --------------------------------
  // Message Type
  // --------------------------------
  const getType = () => {
    if (!file) {
      return "text";
    }

    if (file.type.startsWith("image/")) {
      return "image";
    }

    if (file.type.startsWith("video/")) {
      return "video";
    }

    return "file";
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSend) return;

    if (!id) {
      console.error("Conversation ID is missing");
      return;
    }

    const content = message.trim();
    const type = getType();

    const formData = new FormData();

    formData.append("type", type);
    formData.append("content", content);

    if (file) {
      formData.append("media", file);
    }

    try {
      setSending(true);

      const res = await SendMessage(id, formData);

      console.log("Message saved:", res?.data);

      const newMessage = res?.data?.data;

      if (!newMessage) {
        console.error("Message response is missing");
        return;
      }

      onSent?.(newMessage);

      if (socket?.connected) {
        socket.emit("send_message", {
          receiverId: id,
          message: newMessage,
        });

        console.log("📤 Message sent through socket");
      } else {
        console.warn("Socket is not connected");
      }
      setMessage("");

      cancelSelection();

    } catch (error) {
      console.error(
        "Failed to send message:",
        error?.response?.data || error
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="px-4 pb-5 pt-2 sm:px-5 sm:pb-6">

      {/* File Preview */}
      {file && (
        <div className="relative mb-2 inline-block">

          {preview ? (
            <img
              src={preview}
              alt={file.name}
              className="h-20 w-20 rounded-lg object-cover"
            />
          ) : (
            <div className="max-w-[220px] truncate rounded-lg bg-white px-3 py-2 text-sm text-[#222]">
              {file.name}
            </div>
          )}

          <button
            type="button"
            onClick={cancelSelection}
            className="
              absolute
              -right-2
              -top-2
              flex
              h-6
              w-6
              items-center
              justify-center
              rounded-full
              bg-white
              text-[#555]
              shadow
              transition
              hover:bg-[#f5f5f5]
            "
          >
            <X size={15} />
          </button>

        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2"
      >

        {/* Input Container */}
        <div
          className="
            flex
            min-h-[64px]
            flex-1
            items-center
            rounded-full
            bg-white
            px-4
            shadow-[0_4px_20px_rgba(0,0,0,0.04)]
          "
        >

          {/* Emoji */}
          <button
            type="button"
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              text-[#73746e]
              transition
              hover:text-[#222]
            "
          >
            <Smile
              size={28}
              strokeWidth={1.8}
            />
          </button>

          {/* Message */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message"
            className="
              min-w-0
              flex-1
              bg-transparent
              px-2
              text-[17px]
              text-[#222]
              outline-none
              placeholder:text-[#8d8e88]
            "
          />

          {/* Attachment */}
          <div>
            <label
              htmlFor="file"
              className="
                flex
                h-10
                w-10
                shrink-0
                cursor-pointer
                items-center
                justify-center
                text-[#73746e]
                transition
                hover:text-[#222]
              "
            >
              <Paperclip
                size={27}
                strokeWidth={1.8}
              />
            </label>

            <input
              ref={fileInputRef}
              type="file"
              id="file"
              name="file"
              className="hidden"
              onChange={handleChange}
              accept="image/*,video/*,.pdf,.doc,.docx,.txt"
            />
          </div>

          {/* Mic */}
          <button
            type="button"
            className="
              hidden
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              text-[#73746e]
              transition
              hover:text-[#222]
              xs:flex
            "
          >
            <Mic
              size={26}
              strokeWidth={1.8}
            />
          </button>

        </div>

        {/* Send */}
        <button
          type="submit"
          disabled={!canSend}
          className="
            flex
            h-[62px]
            w-[62px]
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#b9f22a]
            text-[#20251a]
            shadow-[0_5px_18px_rgba(150,200,20,0.18)]
            transition
            hover:scale-105
            hover:bg-[#ace51e]
            active:scale-95
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <Send
            size={28}
            fill="currentColor"
            strokeWidth={1.5}
            className="-rotate-[5deg]"
          />
        </button>

      </form>
    </div>
  );
};

export default MessageInput;