import {
  XIcon,
  UserXIcon,

} from "@animateicons/react/lucide";

const blockedUsers = [
  {
    id: 1,
    name: "Rahul Sharma",
    username: "@rahul",
    avatar: "https://i.pravatar.cc/100?img=11",
  },
  {
    id: 2,
    name: "Aman Verma",
    username: "@aman",
    avatar: "https://i.pravatar.cc/100?img=13",
  },
];

const BlockedUsersModal = ({ onClose }) => {
  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/20
        px-4
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-md
          rounded-[28px]
          bg-white
          p-5
          shadow-2xl
          sm:p-6
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#181818]">
              Blocked users
            </h2>

            <p className="mt-1 text-xs text-gray-400">
              Manage people you have blocked
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-gray-100
            "
          >
            <XIcon
              size={18}
              duration={0.6}
              color="#555"
            />
          </button>
        </div>

        {/* Users */}
        <div className="mt-6 space-y-2.5">
          {blockedUsers.map((user) => (
            <div
              key={user.id}
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-[#eeeeeb]
                p-3
              "
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="h-11 w-11 rounded-full object-cover"
              />

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[#222]">
                  {user.name}
                </p>

                <p className="mt-0.5 text-xs text-gray-400">
                  {user.username}
                </p>
              </div>

              <button
                type="button"
                className="
                  rounded-xl
                  bg-[#eef8ee]
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-[#4caf50]
                  hover:bg-[#e3f5e3]
                "
              >
                Unblock
              </button>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
          <UserXIcon
            size={15}
            duration={0.6}
            color="#9a9a95"
          />

          <span>
            {blockedUsers.length} blocked users
          </span>
        </div>
      </div>
    </div>
  );
};

export default BlockedUsersModal;