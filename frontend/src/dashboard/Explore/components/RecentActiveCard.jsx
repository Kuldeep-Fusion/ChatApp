import { CircleCheckIcon } from "@animateicons/react/lucide";

const RecentActiveCard = ({ user }) => {
  return (
    <div className="flex w-[58px] shrink-0 flex-col items-center">
      
      {/* Avatar */}
      <div className="relative">
        <div
          className="
            h-[52px]
            w-[52px]
            overflow-hidden
            rounded-full
            border-2
            border-white
            bg-[#e8e8e3]
            shadow-sm
            ring-1
            ring-[#d9d9d2]
          "
        >
          <img
            src={user.avatar || "https://i.pravatar.cc/150?img=12"}
            alt={user?.name || "User"}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Online indicator */}
        <span
          className="
            absolute
            bottom-0
            right-0
            h-3
            w-3
            rounded-full
            border-2
            border-[#f7f7f5]
            bg-[#55bd55]
          "
        />
      </div>

      {/* Name */}
      <p
        className="
          mt-1.5
          w-full
          truncate
          text-center
          text-[10px]
          font-medium
          text-[#555]
        "
      >
        {user?.name?.split(" ")[0] || "User"}
      </p>
    </div>
  );
};

export default RecentActiveCard;