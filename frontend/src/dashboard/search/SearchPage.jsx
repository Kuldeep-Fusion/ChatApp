import { GooeyToaster, gooeyToast } from 'goey-toast'

import { useState } from "react";
import { Search, X, UserPlus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SearchUsers } from "../../services/search.api";
import { AddFriend } from "../../services/friend.api";


const SearchPage = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value.trim()) {
      setUsers([]);
      return;
    }

    try {
      setLoading(true);
      const res = await SearchUsers(value);
      const usersData = res?.data?.Data || [];
      setUsers(usersData);
    } catch (error) {
      console.error("Search users error:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

const handleAddFriend = async (userId) => {
  try {
    const res = await AddFriend(userId);

    console.log("Friend request response:", res);

    gooeyToast.success("Request sent", {
      description:
        "Your friend request has been sent successfully.",
      showTimestamp: false,
    });
  } catch (error) {
    console.error("Add friend error:", error);

    gooeyToast.error("Request failed", {
      description:
        error?.response?.data?.message ||
        "Something went wrong. Please try again.",
      showTimestamp: false,
    });
  }
};

  const clearSearch = () => {
    setSearch("");
    setUsers([]);
  };

  return (
    <div className="relative mx-auto flex h-[90vh] w-full max-w-md flex-col overflow-hidden bg-emerald-950 sm:rounded-[32px] sm:border sm:border-emerald-800/40 sm:shadow-2xl">
      <GooeyToaster position="top-center" closeOnEscape={false} />
      {/* Header Section */}
      <div className="relative flex h-36 w-full flex-col justify-center bg-emerald-950 px-6 pt-4 text-center">
        {/* Glow Effect */}
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-8 -bottom-4 h-28 w-28 rounded-full bg-lime-500/10 blur-2xl" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="absolute left-4 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Header Title */}
        <div className="mx-auto">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Find Friends
          </h1>
          <p className="mt-1 text-xs text-emerald-200/80">
            Explore new people and connect
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-t-[32px] bg-gray-50 px-4 pt-5 pb-4">
        
        {/* Search Bar */}
        <div className="relative flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 shadow-xs transition-all focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/10">
          <Search size={20} className="text-gray-400" />
          
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by name or username..."
            className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />

          {search && (
            <button
              onClick={clearSearch}
              className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 active:scale-90"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Results Container */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          
          {/* Skeleton Loader */}
          {loading && (
            <div className="space-y-3">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-xs animate-pulse"
                >
                  <div className="h-12 w-12 rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 w-32 rounded bg-gray-200" />
                    <div className="h-2.5 w-20 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* User List */}
          {!loading && users.length > 0 && (
            <div className="space-y-2">
              <p className="px-1 text-[11px] font-semibold tracking-wider text-gray-400 uppercase">
                People ({users.length})
              </p>

              {users.map((user) => (
                <div
                  key={user._id}
                  className="group flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-2xs transition-all hover:border-emerald-100 hover:shadow-md"
                >
                  {/* Avatar */}
                  <img
                    src={user.avatar || "https://i.pravatar.cc/150?img=12"}
                    alt={user.name}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-gray-100"
                  />

                  {/* User Details */}
                  <div
                    className="min-w-0 flex-1 cursor-pointer"
                  >
                    <h3 className="truncate text-sm font-semibold text-gray-900 group-hover:text-emerald-700">
                      {user.name}
                    </h3>
                    <p className="truncate text-xs text-gray-500">
                      {user.username}
                    </p>
                  </div>

                  {/* Action Button */}
                  <button
                    type="button"
                    onClick={() => handleAddFriend(user._id)}
                    aria-label="Add friend"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-950 text-white transition-transform hover:scale-105 active:scale-95"
                  >
                    <UserPlus size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* No Search Results */}
          {!loading && search && users.length === 0 && (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-xs">
                <Search size={24} className="text-gray-400" />
              </div>
              <h2 className="text-sm font-semibold text-gray-800">
                No people found
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Try searching with a different name or username.
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !search && (
            <div className="flex h-full flex-col items-center justify-center py-16 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100/60 text-emerald-800">
                <Search size={22} />
              </div>
              <h2 className="text-sm font-semibold text-gray-800">
                Search for friends
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                Find your acquaintances and start connecting.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SearchPage;