import {
  Paperclip,
  Mic,
  Send,
  X,
  Pencil,
} from "lucide-react";

import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { SendMessage } from "../../services/message.api";
import { useSocket } from "../../context/SocketProvider";

const MessageInput = ({
  onSent,
  editingMessage = null,
  onCancelEdit,
  onEditSubmit,
}) => {
  const { id } = useParams();
  

  const socket = useSocket();

  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [sending, setSending] = useState(false);

  const fileInputRef = useRef(null);

  const isEditing = Boolean(editingMessage);

  // --------------------------------
  // Load message into input when edit starts
  // --------------------------------
  useEffect(() => {
    if (editingMessage) {
      setMessage(editingMessage.content || "");

      // Editing is only for text messages
      setFile(null);
      setPreview(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [editingMessage]);

  // --------------------------------
  // Can Send
  // --------------------------------
  const canSend =
    message.trim() && !sending;

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

  // --------------------------------
  // Cancel Edit
  // --------------------------------
  const handleCancelEdit = () => {
    setMessage("");

    onCancelEdit?.();
  };

  // --------------------------------
  // Submit
  // --------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSend) return;

    // ==================================
    // EDIT MODE
    // ==================================
    if (isEditing) {
      try {
        setSending(true);

        await onEditSubmit?.({
          id: editingMessage.id,
          content: message.trim(),
        });

        setMessage("");

        onCancelEdit?.();
      } catch (error) {
        console.error(
          "Failed to edit message:",
          error?.response?.data || error
        );
      } finally {
        setSending(false);
      }

      return;
    }

    // ==================================
    // NORMAL SEND MODE
    // ==================================
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

      {/* ================================
          EDIT MODE HEADER
      ================================= */}
      {isEditing && (
        <div
          className="
            mb-2
            flex
            items-center
            justify-between
            rounded-xl
            bg-white
            px-4
            py-2
            shadow-[0_2px_10px_rgba(0,0,0,0.04)]
          "
        >
          <div className="flex items-center gap-2">
            <Pencil
              size={16}
              className="text-[#687d1c]"
            />

            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#20251a]">
                Editing message
              </span>

              <span className="max-w-[250px] truncate text-xs text-gray-500">
                {editingMessage?.content}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleCancelEdit}
            className="
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              text-gray-500
              transition
              hover:bg-gray-100
              hover:text-gray-800
            "
            aria-label="Cancel editing"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* ================================
          FILE PREVIEW
      ================================= */}
      {!isEditing && file && (
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

      {/* ================================
          FORM
      ================================= */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2"
      >

        {/* INPUT CONTAINER */}
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

          {/* Attachment */}
          {!isEditing && (
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
          )}

          {/* Message */}
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={
              isEditing
                ? "Edit your message..."
                : "Enter your message"
            }
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

          {/* Mic */}
          {!isEditing && (
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
          )}

        </div>

        {/* ================================
            SEND / UPDATE BUTTON
        ================================= */}
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
          {isEditing ? (
            <Pencil
              size={25}
              strokeWidth={2}
            />
          ) : (
            <Send
              size={28}
              fill="currentColor"
              strokeWidth={1.5}
              className="-rotate-[5deg]"
            />
          )}
        </button>

      </form>
    </div>
  );
};

export default MessageInput;