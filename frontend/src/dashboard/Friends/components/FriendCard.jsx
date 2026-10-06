

import { motion } from "framer-motion";
import {
  MessageCircle,
  MoveRight,
} from "@animateicons/react/lucide";

import {Link} from 'react-router-dom'

const FriendCard = ({ friend  }) => {

    const formatLastSeen = (date) => {
    if (!date) {
      return "offline";
    }

    const lastSeenDate = new Date(date);

    return `last seen ${lastSeenDate.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
  };

  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="rounded-[20px] border border-[#E7DFD2] bg-[#FFFDF8] p-3.5 shadow-[0_4px_20px_rgba(52,45,35,0.04)] sm:p-4"
    >
      <div className="flex items-center gap-3">

        {/* Avatar */}
        <div className="relative shrink-0">
          <img
            src={friend.avatar}
            alt={friend.name}
            className="h-11 w-11 rounded-full object-cover sm:h-12 sm:w-12"
          />

          {friend.isOnline && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#FFFDF8] bg-[#79A95A]" />
          )}
        </div>

        {/* User */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[13px] font-bold text-[#163B2A] sm:text-[14px]">
            {friend.name}
          </h3>

          <p className="mt-0.5 truncate text-[11px] text-[#8A8276] sm:text-xs">
            {friend.username}
          </p>

          <p className="mt-1 text-[10px] font-medium text-[#79A95A]">
            {formatLastSeen(friend.lastSeen)}
          </p>
        </div>

        <button
          type="button"
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#8A8276] transition hover:bg-[#F2ECE2] hover:text-[#163B2A]"
        >
          <MoveRight size={17} />
        </button>

      </div>

      {/* Message */}
      <Link to={`/chat/${friend._id}`}>
      <button
        type="button"
        className="mt-3.5 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#163B2A] text-[12px] font-semibold text-white transition hover:bg-[#1D4A35] active:scale-[0.98] sm:h-11 sm:text-[13px]"
      >
        <MessageCircle size={15} />
        Message
      </button>
      </Link>

    </motion.article>
  );
};

export default FriendCard;

