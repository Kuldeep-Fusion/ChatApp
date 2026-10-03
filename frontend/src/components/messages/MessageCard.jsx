import { CheckCheckIcon } from "@animateicons/react/lucide";
import { useNavigate } from "react-router-dom";

const MessageCard = ({
  userId,
  avatar = "",
  name = "Unknown User",
  lastMessage = "No messages yet",
  time = "",
  unread = 0,
  online = false,
  active = false,
}) => {
const navigate = useNavigate();
const handleClick = () => {
    navigate(`/chat/${userId}`);
  };


  return (
 <div
      onClick={handleClick}
      className="group flex w-full cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 transition-all duration-200 hover:bg-[#f5f8f6]"
    >
    <div
      className={`
        group flex w-full cursor-pointer items-center
        gap-3 rounded-2xl px-3 py-3
        transition-all duration-200
        ${
          active
            ? "bg-[#eef5f0]"
            : "hover:bg-[#f5f8f6]"
        }
      `}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <img
          src={avatar}
          alt={name}
          className="h-12 w-12 rounded-full object-cover"
        />

        {/* Online */}
        {online && (
          <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-[3px] border-white bg-[#4ade80]" />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {/* Name + Time */}
        <div className="flex items-center justify-between gap-3">
          <h3
            className={`
              truncate text-[14px] font-semibold
              tracking-[-0.01em]
              ${
                unread > 0
                  ? "text-[#183326]"
                  : "text-[#26342d]"
              }
            `}
          >
            {name}
          </h3>

          <span
            className={`
              shrink-0 text-[10px] font-medium
              ${
                unread > 0
                  ? "text-[#47735a]"
                  : "text-[#9aa59f]"
              }
            `}
          >
            {time}
          </span>
        </div>

        {/* Last Message */}
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
              ${
                unread > 0
                  ? "font-medium text-[#3d5045]"
                  : "text-[#8a958f]"
              }
            `}
          >
            {lastMessage}
          </p>
        </div>
      </div>

      {/* Unread Count */}
      {unread > 0 && (
        <span className="flex min-w-[18px] shrink-0 items-center justify-center rounded-full bg-[#183326] px-1.5 py-0.5 text-[9px] font-semibold text-[#d9f99d]">
          {unread > 99 ? "99+" : unread}
        </span>
      )}
    </div>
    </div>
  );
};

export default MessageCard;