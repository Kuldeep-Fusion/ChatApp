import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GooeyToaster, gooeyToast } from "goey-toast";

import FriendsTabs from "./components/FriendsTabs";
import RequestCard from "./components/RequestCard";
import PendingCard from "./components/PendingCard";
import FriendCard from "./components/FriendCard";
import EmptyFriends from "./components/EmptyFriends";

import {
  AcceptRequest,
  FriendList,
  GetPendingList,
  GetRequestList,
  CancelRequest,
  RejectRequest,
} from "../../services/friend.api";

const Friends = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);

  // All my friends
  const handleFriendsList = async () => {
    try {
      const res = await FriendList();
      setFriends(res?.data?.friends || []);
    } catch (error) {
      setFriends([]);
      gooeyToast.error("Failed to load friends", {
        description:
          error?.response?.data?.message || "Unable to fetch your friends.",
      });
    }
  };

  // Incoming requests
  const handleRequestList = async () => {
    try {
      const res = await GetRequestList();
      setRequests(res?.data?.requests || []);
    } catch (error) {
      console.error("Failed to fetch friend requests:", error);
      setRequests([]);
      gooeyToast.error("Failed to load requests");
    }
  };

  // Sent / pending requests
  const handlePendingList = async () => {
    try {
      const res = await GetPendingList();
      setPending(res?.data?.pending || []);
    } catch (error) {
      console.error("Failed to fetch pending requests:", error);
      setPending([]);
      gooeyToast.error("Failed to load pending requests");
    }
  };

  // Cancel a request I sent
  // NOTE: verify in friend.api that PendingRejectRequest is the "cancel sent request" call.
  const handleDeletePending = async (relationshipId) => {
    if (!relationshipId) {
      gooeyToast.error("Unable to cancel request", {
        description: "Relationship ID is missing.",
      });
      return;
    }

    try {
      await CancelRequest(relationshipId);

      setPending((prev) =>
        prev.filter((item) => item.relationshipId !== relationshipId)
      );
      gooeyToast.success("Request cancelled");
    } catch (error) {
      console.error(
        "Failed to cancel pending request:",
        error?.response?.data || error
      );
      gooeyToast.error("Failed to cancel request");
    }
  };

  // Accept an incoming request (takes the id explicitly - `request` was undefined before)
  const handleAccept = async (requestId) => {
    if (!requestId) {
      gooeyToast.error("Failed to accept", {
        description: "Request ID is missing.",
      });
      return;
    }

    try {
      await AcceptRequest(requestId);

      // remove instantly from UI (match on either id field)
      setRequests((prev) =>
        prev.filter(
          (r) => r._id !== requestId && r.relationshipId !== requestId
        )
      );

      // re-sync with server so lists are always accurate
      await Promise.all([handleRequestList(), handleFriendsList()]);

      gooeyToast.success("Request accepted");
    } catch (error) {
      console.error("Failed to accept request:", error?.response?.data || error);
      gooeyToast.error("Failed to accept");
    }
  };

  // Reject an incoming request
  const handleReject = async (requestId) => {
    if (!requestId) {
      gooeyToast.error("Failed to reject", {
        description: "Request ID is missing.",
      });
      return;
    }

    try {
      await RejectRequest(requestId);

      setRequests((prev) =>
        prev.filter(
          (r) => r._id !== requestId && r.relationshipId !== requestId
        )
      );

      await handleRequestList();

      gooeyToast.success("Request rejected");
    } catch (error) {
      console.error("Failed to reject request:", error?.response?.data || error);
      gooeyToast.error("Failed to reject");
    }
  };

  // Initial fetch
  const fetchFriendData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        handleFriendsList(),
        handleRequestList(),
        handlePendingList(),
      ]);
    } catch (error) {
      console.error("Failed to fetch friend data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFriendData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#D9F99D] border-t-[#163B2A]" />
        </div>
      );
    }

    switch (activeTab) {
      case "friends":
        return friends.length ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {friends.map((friend) => friend && (
              <FriendCard
                key={friend?.relationshipId || friend?._id}
                friend={friend}
              />
            ))}
          </div>
        ) : (
          <EmptyFriends type="friends" />
        );

      case "requests":
        return requests.length ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {requests.map((request) => request && (
              <RequestCard
                key={request?._id}
                request={request}
                handleAccept={() => handleAccept(request?._id)}
                handleReject={() => handleReject(request?._id)}
              />
            ))}
          </div>
        ) : (
          <EmptyFriends type="requests" />
        );

      case "pending":
        return pending.length ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pending.map((item) => item && (
              <PendingCard
                key={item?.relationshipId || item?._id}
                item={item}
                onDelete={handleDeletePending}
              />
            ))}
          </div>
        ) : (
          <EmptyFriends type="pending" />
        );

      default:
        return null;
    }
  };

  return (
    <main className="overflow-hidden bg-green-950 text-[#163B2A] sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <GooeyToaster position="top-center" />

        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="overflow-hidden"
        >
          <div className="relative flex min-h-32 flex-col items-center justify-center px-4">
            {/* Subtle glow */}
            <div className="pointer-events-none absolute -left-16 -top-20 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-16 h-40 w-40 rounded-full bg-lime-400/10 blur-3xl" />

            {/* Small label (spans had no height, so the lines never rendered) */}
            <div className="relative mb-1 flex items-center gap-2">
              <span className="h-px w-5 bg-emerald-400/40" />
              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/50">
                Connections
              </p>
              <span className="h-px w-5 bg-emerald-400/40" />
            </div>

            <h1 className="relative text-4xl font-black tracking-[0.12em] text-white">
              FRIENDS
            </h1>

            <div className="relative mt-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <p className="text-[10px] font-medium tracking-wide text-white/55">
                {friends.length}{" "}
                {friends.length === 1 ? "connection" : "connections"}
              </p>
            </div>
          </div>
        </motion.header>

        {/* TABS + CONTENT */}
        <div className="min-h-0 flex-1 overflow-hidden rounded-t-4xl bg-white px-4 py-4">
          <FriendsTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            counts={{
              friends: friends.length,
              requests: requests.length,
              pending: pending.length,
            }}
          />

          <AnimatePresence mode="wait">
            <motion.section
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-4 sm:mt-5"
            >
              {renderContent()}
            </motion.section>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

export default Friends;