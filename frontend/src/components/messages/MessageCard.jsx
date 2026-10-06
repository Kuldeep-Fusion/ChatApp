import { useState, useEffect, useRef, memo } from "react";
import {
  CheckCheckIcon,
  EllipsisVerticalIcon,
  Trash2Icon,
  UserIcon,
} from "@animateicons/react/lucide";
import { useNavigate } from "react-router-dom";

const MessageCard = memo(({
  conversationId,
  userId,
  avatar = "",
  name = "Unknown User",
  lastMessage = "No messages yet",
  time = "",
  unread = 0,
  online = false,
  active = false,
  onDelete,
  onView, // Optional: Profile/Details view callback
}) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleClick = () => {
    if (menuOpen) return;
    navigate(`/chat/${userId}`);
  };

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  };

  const handleView = (e) => {
    e.stopPropagation();
    setMenuOpen(false);

    if (onView) {
      onView(userId, conversationId);
    } else {
      // Default action: Navigate to user profile or chat
      navigate(`/chat/${userId}`);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setMenuOpen(false);

    if (onDelete && conversationId) {
      onDelete(conversationId);
    }
  };

  // Avatar Initial Fallback
  const getInitials = (userName) => {
    return userName ? userName.charAt(0).toUpperCase() : "U";
  };

  return (
    <div
      onClick={handleClick}
      className={`
        group relative
        flex w-full cursor-pointer
        items-center gap-3
        rounded-2xl px-3 py-3
        transition-all duration-200
        ${active ? "bg-[#eef5f0]" : "hover:bg-[#f5f8f6]"}
      `}
    >
      {/* Avatar with Fallback */}
      <div className="relative shrink-0">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="h-12 w-12 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#183326] text-[15px] font-semibold text-[#d9f99d]">
            {getInitials(name)}
          </div>
        )}

        {online && (
          <span
            className="
              absolute bottom-0 right-0
              h-3.5 w-3.5
              rounded-full
              border-[3px]
              border-white
              bg-[#4ade80]
            "
          />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3
            className={`
              min-w-0 flex-1
              truncate text-[14px]
              font-semibold
              ${unread > 0 ? "text-[#183326]" : "text-[#26342d]"}
            `}
          >
            {name}
          </h3>

          <span
            className={`
              shrink-0 text-[10px] font-medium
              ${unread > 0 ? "text-[#47735a]" : "text-[#9aa59f]"}
            `}
          >
            {time}
          </span>
        </div>

        <div className="mt-1 flex min-w-0 items-center gap-1.5">
          {unread === 0 && (
            <CheckCheckIcon
              size={14}
              duration={0.5}
              className="shrink-0 text-[#6b8f79]"
            />
          )}

          <p
            className={`
              truncate text-[12px] leading-5
              ${unread > 0 ? "font-medium text-[#3d5045]" : "text-[#8a958f]"}
            `}
          >
            {lastMessage}
          </p>
        </div>
      </div>

      {/* Unread Badge */}
      {unread > 0 && (
        <span
          className="
            flex min-w-[18px]
            shrink-0 items-center
            justify-center
            rounded-full
            bg-[#183326]
            px-1.5 py-0.5
            text-[9px]
            font-semibold
            text-[#d9f99d]
          "
        >
          {unread > 99 ? "99+" : unread}
        </span>
      )}

      {/* Options Dropdown */}
      <div ref={menuRef} className="relative shrink-0">
        <button
          type="button"
          onClick={handleMenuClick}
          aria-label="Options"
          className={`
            flex h-8 w-8
            items-center justify-center
            rounded-full
            text-[#7c8881]
            transition
            hover:bg-[#e8eee9]
            hover:text-[#183326]
            ${menuOpen ? "opacity-100 bg-[#e8eee9]" : "sm:opacity-0 sm:group-hover:opacity-100"}
          `}
        >
          <EllipsisVerticalIcon size={20} duration={0.5} />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              absolute
              right-0
              top-9
              z-50
              w-36
              rounded-xl
              border
              border-[#e4e8e5]
              bg-white
              p-1
              shadow-[0_10px_30px_rgba(0,0,0,0.12)]
            "
          >
            {/* View Option */}
            <button
              type="button"
              onClick={handleView}
              className="
                flex w-full items-center gap-2
                rounded-lg
                px-3 py-2
                text-left
                text-[12px]
                font-medium
                text-[#26342d]
                hover:bg-[#f2f6f3]
                transition
              "
            >
              <UserIcon size={14} className="text-[#6b8f79]" />
              View Chats
            </button>

            {/* Divider */}
            <div className="my-0.5 h-[1px] bg-[#edf1ee]" />

            {/* Delete Option */}
            <button
              type="button"
              onClick={handleDelete}
              className="
                flex w-full items-center gap-2
                rounded-lg
                px-3 py-2
                text-left
                text-[12px]
                font-medium
                text-red-600
                hover:bg-red-50
                transition
              "
            >
              <Trash2Icon size={14} />
              Delete chat
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

MessageCard.displayName = "MessageCard";

export default MessageCard;