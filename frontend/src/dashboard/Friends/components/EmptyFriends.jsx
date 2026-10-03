import {
  Users,
  UserPlus,
  ClockIcon,
  UserRoundX,
} from "@animateicons/react/lucide";

const EmptyFriends = ({ type }) => {
  const content = {
    friends: {
      icon: Users,
      title: "No friends yet",
      description:
        "Explore people and start building your Chatter network.",
      button: "Explore People",
    },

    requests: {
      icon: UserPlus,
      title: "No friend requests",
      description:
        "New friend requests will appear here.",
    },

    pending: {
      icon: ClockIcon,
      title: "Nothing pending",
      description:
        "Friend requests you send will appear here.",
    },

    rejected: {
      icon: UserRoundX,
      title: "No rejected requests",
      description:
        "Requests you reject will appear here.",
    },
  };

  const data = content[type];
  const Icon = data.icon;

  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-[22px] border border-dashed border-[#DDD4C6] bg-white/35 px-6 text-center sm:min-h-[360px]">

      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E9E2D6] text-[#163B2A]">
        <Icon size={24} />
      </div>

      <h3 className="text-[14px] font-bold text-[#163B2A] sm:text-[15px]">
        {data.title}
      </h3>

      <p className="mt-1.5 max-w-[280px] text-[12px] leading-5 text-[#8A8276] sm:text-[13px]">
        {data.description}
      </p>

      {data.button && (
        <button
          type="button"
          className="mt-5 h-10 rounded-xl bg-[#163B2A] px-5 text-[11px] font-semibold text-white transition hover:bg-[#1D4A35] active:scale-[0.98] sm:h-11 sm:text-xs"
        >
          {data.button}
        </button>
      )}

    </div>
  );
};

export default EmptyFriends;
