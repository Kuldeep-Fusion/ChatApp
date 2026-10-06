import React, { useEffect, useRef, useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

const MessageActions = ({
  message,
  isMediaMessage = false,
  isMine = false,
  onEdit,
  onDelete,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setShowMenu(false);

    onEdit?.({
      id: message.id,
      content: message.content,
      media: message.media,
      type: message.type,
    });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setShowMenu(false);

    onDelete?.({
      id: message.id,
      type: message.type,
    });
  };

  return (
    <div
      ref={menuRef}
      className={`absolute top-2 z-20 ${
        isMine ? "-left-8" : "-right-8"
      }`}
    >
      {/* Three dots button */}
      <button
        type="button"
        onClick={handleToggleMenu}
        aria-label="Message options"
        aria-expanded={showMenu}
        className="
          flex h-7 w-7
          items-center justify-center
          rounded-full
          bg-gray-200/80
          text-gray-700
          backdrop-blur-sm
          transition-all
          hover:bg-gray-300
          active:scale-95
        "
      >
        <MoreVertical size={16} />
      </button>

      {/* Action menu */}
      {showMenu && (
        <div
          className={`
            absolute top-8 z-30
            min-w-[120px]
            rounded-xl
            border border-gray-100
            bg-white
            p-1
            shadow-lg
            ring-1 ring-black/5
            ${isMine ? "left-0" : "right-0"}
          `}
        >
          {/* Edit - text messages only */}
          {!isMediaMessage && (
            <button
              type="button"
              onClick={handleEdit}
              className="
                flex w-full
                items-center gap-2
                rounded-lg
                px-3 py-2
                text-xs font-medium
                text-gray-700
                transition-colors
                hover:bg-gray-100
              "
            >
              <Pencil size={14} className="text-gray-500" />
              <span>Edit</span>
            </button>
          )}

          {/* Delete - text + media */}
          <button
            type="button"
            onClick={handleDelete}
            className="
              flex w-full
              items-center gap-2
              rounded-lg
              px-3 py-2
              text-xs font-medium
              text-red-600
              transition-colors
              hover:bg-red-50
            "
          >
            <Trash2 size={14} className="text-red-500" />
            <span>Delete</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageActions;