
import {
  ArrowLeft,
  MoreVertical,
  Search,
} from "lucide-react";


const ChatHeader = ({ user, isActive, lastSeen }) => {

  return (
    <header className="flex items-center justify-between px-5 pb-4 pt-10 sm:pt-6">
      
      {/* Left */}
      <div className="flex min-w-0 items-center gap-3">
        
        <button
        onClick={() => window.history.back()}
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-full
            text-[#171717]
            transition
            hover:bg-black/5
          "
        >
          <ArrowLeft size={27} strokeWidth={2} />
        </button>

        {/* Avatar */}
        <div className="relative shrink-0">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="
              h-12
              w-12
              rounded-full
              object-cover
            "
          />

          <span
            className="
              absolute
              bottom-0
              right-0
              h-3.5
              w-3.5
              rounded-full
              border-2
              border-[#f8f8ee]
              bg-[#9ddd1b]
            "
          />
        </div>

        {/* User info */}
        <div className="min-w-0">
          <h2 className="truncate text-[18px] font-semibold tracking-[-0.02em] text-[#171717]">
            {user?.name}
          </h2>

          {isActive ? <div className="mt-0.5 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#9ddd1b]" />

            <span className="text-sm font-medium text-[#77786f]">
              online
            </span>
          </div> : <div className="mt-0.5 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#9ddd1b]" />

            <span className="text-sm font-medium text-[#77786f]">
             {lastSeen}
            </span>
          </div>}
        </div>
      </div>

      {/* Right */}
      <div className="flex shrink-0 items-center gap-1">
        <button
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            text-[#171717]
            transition
            hover:bg-black/5
          "
        >
          <Search size={28} strokeWidth={2} />
        </button>

        <button
          className="
            flex
            h-11
            w-8
            items-center
            justify-center
            rounded-full
            text-[#171717]
            transition
            hover:bg-black/5
          "
        >
          <MoreVertical size={27} strokeWidth={2} />
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;