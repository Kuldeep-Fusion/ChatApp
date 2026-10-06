
import { motion } from "framer-motion";
import {
  Users,
  UserPlus,
  ClockIcon,
  UserRoundX,
} from "@animateicons/react/lucide";

const FriendsTabs = ({
  activeTab,
  setActiveTab,
  counts,
}) => {
  const tabs = [
    {
      id: "friends",
      label: "Friends",
      icon: Users,
      count: counts.friends,
    },
    {
      id: "requests",
      label: "Requests",
      icon: UserPlus,
      count: counts.requests,
    },
    {
      id: "pending",
      label: "Pending",
      icon: ClockIcon,
      count: counts.pending,
    },
  ];

  return (
    <div className="w-full overflow-x-auto scrollbar-none">
      <div className="flex min-w-max border-b border-[#E3DACD]">

        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative flex h-12 shrink-0 items-center gap-1.5
                px-3 text-[12px] font-semibold
                transition-colors sm:px-4 sm:text-[13px]
                ${
                  isActive
                    ? "text-[#163B2A]"
                    : "text-[#8B8478] hover:text-[#4E493F]"
                }
              `}
            >
              <Icon
                size={15}
                duration={0.5}
              />

              <span>{tab.label}</span>

              {tab.count > 0 && (
                <span
                  className={`
                    ml-0.5 min-w-[19px] rounded-full px-1.5
                    py-0.5 text-center text-[9px] font-bold
                    ${
                      isActive
                        ? "bg-[#163B2A] text-[#D9F99D]"
                        : "bg-[#EAE3D8] text-[#81796C]"
                    }
                  `}
                >
                  {tab.count}
                </span>
              )}

              {isActive && (
                <motion.div
                  layoutId="activeFriendTab"
                  className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full bg-[#163B2A]"
                />
              )}
            </button>
          );
        })}

      </div>
    </div>
  );
};

export default FriendsTabs;

