import { useEffect, useState } from "react";

import {
  XIcon,
  SearchIcon,
  UserMinusIcon,
} from "@animateicons/react/lucide";

import { FriendList } from "../../services/friend.api";

const FriendsModal = ({ onClose }) => {
  const [friends, setFriends] = useState([]);
  const [search, setSearch] = useState("");

  // Get Friends
  const getFriendList = async () => {
    try {
      const res = await FriendList();

      console.log("Friend API:", res.data);

      // If API response is:
      // { data: [...] }
     setFriends(res.data.friends);
    } catch (error) {
      console.log("Friend list error:", error);
      setFriends([]);
    }
  };

  useEffect(() => {
    getFriendList();
  }, []);

  // Search
  const filteredFriends = friends.filter((friend) => {
    const value = search.toLowerCase();

    return (
      friend.name?.toLowerCase().includes(value) ||
      friend.username?.toLowerCase().includes(value)
    );
  });

  // Remove friend from UI
  const handleRemoveFriend = (friendId) => {
    setFriends((prev) =>
      prev.filter((friend) => friend._id !== friendId)
    );
  };

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/20 px-4 py-6
        backdrop-blur-sm
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          flex max-h-[85vh] w-full max-w-md
          flex-col overflow-hidden
          rounded-[28px] bg-white
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="shrink-0 px-5 pb-4 pt-5 sm:px-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold text-[#181818]">
                Friends
              </h2>

              <p className="mt-1 text-xs text-gray-400">
                {friends.length} friends in your network
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                flex h-9 w-9
                items-center justify-center
                rounded-full bg-gray-100
                text-gray-500
                transition hover:bg-gray-200
              "
            >
              <XIcon
                size={18}
                duration={0.6}
                color="#555"
              />
            </button>
          </div>

          {/* Search */}
          <div
            className="
              mt-5 flex h-11
              items-center gap-2.5
              rounded-xl
              border border-[#eeeeeb]
              bg-[#fafaf8]
              px-3.5
            "
          >
            <SearchIcon
              size={18}
              duration={0.6}
              color="#999"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search friends..."
              className="
                min-w-0 flex-1
                bg-transparent
                text-sm text-[#222]
                outline-none
                placeholder:text-gray-400
              "
            />
          </div>
        </div>

        {/* Friends List */}
        <div className="flex-1 overflow-y-auto px-5 pb-5 sm:px-6">
          {filteredFriends.length > 0 ? (
            <div className="space-y-2.5">
              {filteredFriends.map((friend) => (
                <div
                  key={friend._id}
                  className="
                    group flex items-center gap-3
                    rounded-2xl
                    border border-[#eeeeeb]
                    p-3
                    transition
                    hover:border-[#e4e4e0]
                    hover:shadow-[0_4px_15px_rgba(0,0,0,0.03)]
                  "
                >
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="
                        h-11 w-11
                        rounded-full
                        object-cover
                      "
                    />

                    {/* Online Status */}
                    <span
                      className={`
                        absolute bottom-0 right-0
                        h-3 w-3
                        rounded-full
                        border-2 border-white
                        ${
                          friend.online
                            ? "bg-[#55c557]"
                            : "bg-gray-300"
                        }
                      `}
                    />
                  </div>

                  {/* User Info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-[#222]">
                      {friend.name}
                    </p>

                    <p className="mt-0.5 truncate text-xs text-gray-400">
                      {friend.username}
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveFriend(friend._id)
                    }
                    className="
                      flex shrink-0
                      items-center gap-1.5
                      rounded-xl
                      bg-red-50
                      px-2.5 py-2
                      text-xs font-semibold
                      text-red-500
                      transition
                      hover:bg-red-100
                    "
                  >
                    <UserMinusIcon
                      size={15}
                      duration={0.6}
                      color="#e05b52"
                    />

                    <span className="hidden sm:inline">
                      Remove
                    </span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div
              className="
                flex min-h-[280px]
                flex-col items-center
                justify-center text-center
              "
            >
              <div
                className="
                  flex h-14 w-14
                  items-center justify-center
                  rounded-full bg-[#f1f8ed]
                "
              >
                <SearchIcon
                  size={24}
                  duration={0.6}
                  color="#61b957"
                />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-[#222]">
                {search
                  ? "No friends found"
                  : "No friends yet"}
              </h3>

              <p className="mt-1 max-w-[230px] text-xs leading-5 text-gray-400">
                {search
                  ? "Try searching with a different name or username."
                  : "Your friends will appear here."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsModal;