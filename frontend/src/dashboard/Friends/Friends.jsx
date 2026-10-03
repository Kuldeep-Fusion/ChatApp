import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import FriendsTabs from "./components/FriendsTabs";
import RequestCard from "./components/RequestCard";
import PendingCard from "./components/PendingCard";
import FriendCard from "./components/FriendCard";
import EmptyFriends from "./components/EmptyFriends";

import {
  FriendList,
  GetPendingList,
  GetRejected,
  GetRequestList,
} from "../../services/friend.api";

const Friends = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [pending, setPending] = useState([]);
  const [rejected, setRejected] = useState([]);




  const [loading, setLoading] = useState(false);

  const handleFriendsList = async () => {
    try {
      const res = await FriendList();

      const friendsData = res?.data?.friends || [];

      console.log("Friends:", friendsData);

      setFriends(friendsData);
    } catch (error) {
      console.error("Failed to fetch friends:", error);

      setFriends([]);
    }
  };


  const handleRequestList = async () => {
    try {
      const res = await GetRequestList();

      const requestData = res?.data?.requests || [];

      console.log("Received Requests:", requestData);

      setRequests(requestData);
    } catch (error) {
      console.error(
        "Failed to fetch friend requests:",
        error
      );

      setRequests([]);
    }
  };


  const handlePendingList = async () => {
    try {
      const res = await GetPendingList();

      const pendingData = res?.data?.pending || [];

      console.log("Pending Requests:", pendingData);

      setPending(pendingData);
    } catch (error) {
      console.error(
        "Failed to fetch pending requests:",
        error
      );

      setPending([]);
    }
  };

  const handleRejectedList = async () => {
    try {
      const res = await GetRejected();

      const rejectedData = res?.data?.requests || [];

      console.log("Rejected Requests:", rejectedData);

      setRejected(rejectedData);
    } catch (error) {
      console.error(
        "Failed to fetch rejected requests:",
        error
      );

      setRejected([]);
    }
  };

  // =========================
  // FETCH ALL FRIEND DATA
  // =========================

  const fetchFriendData = async () => {
    try {
      setLoading(true);

      await Promise.all([
        handleFriendsList(),
        handleRequestList(),
        handlePendingList(),
        handleRejectedList(),
      ]);
    } catch (error) {
      console.error(
        "Failed to fetch friend data:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INITIAL FETCH
  // =========================

  useEffect(() => {
    fetchFriendData();
  }, []);

  // =========================
  // RENDER CONTENT
  // =========================

  const renderContent = () => {
    // =========================
    // LOADING
    // =========================

    if (loading) {
      return (
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#D9F99D] border-t-[#163B2A]" />
        </div>
      );
    }

    switch (activeTab) {
      // =========================
      // ALL FRIENDS
      // =========================

      case "friends":
        return friends.length ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {friends.map((friend) => (
              <FriendCard
                key={
                  friend.relationshipId ||
                  friend._id
                }
                friend={friend}
              />
            ))}
          </div>
        ) : (
          <EmptyFriends type="friends" />
        );

      // =========================
      // RECEIVED REQUESTS
      // =========================

      case "requests":
        return requests.length ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {requests.map((request) => (
              <RequestCard
                key={request._id}
                request={request}
              />
            ))}
          </div>
        ) : (
          <EmptyFriends type="requests" />
        );

      // =========================
      // SENT / PENDING
      // =========================

      case "pending":
        return pending.length ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pending.map((item) => (
              <PendingCard
                key={item.relationshipId}
                user={item.user}
                relationshipId={item.relationshipId}
              />
            ))}
          </div>
        ) : (
          <EmptyFriends type="pending" />
        );

      // =========================
      // REJECTED
      // =========================

      case "rejected":
        return rejected.length ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rejected.map((relationship) => (
              <PendingCard
                key={
                  relationship.relationshipId ||
                  relationship._id
                }
                user={
                  relationship.user ||
                  relationship
                }
                relationshipId={
                  relationship.relationshipId ||
                  relationship._id
                }
                rejected
              />
            ))}
          </div>
        ) : (
          <EmptyFriends type="rejected" />
        );

      default:
        return null;
    }
  };

  // =========================
  // UI
  // =========================

  return (
    <main className="min-h-dvh bg-[#F6F1E8] px-4 py-5 text-[#163B2A] sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">

        {/* =========================
            HEADER
        ========================= */}

        <motion.header
          initial={{
            opacity: 0,
            y: 8,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-5 sm:mb-7"
        >
          <div className="flex items-end justify-between gap-4">

            <div>
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9A9286]">
                Connections
              </p>

              <h1 className="text-[25px] font-bold tracking-[-0.04em] text-[#163B2A] sm:text-[30px]">
                Friends
              </h1>

              <p className="mt-1 max-w-md text-[13px] leading-5 text-[#756F64] sm:text-[14px]">
                Manage your friends and connection requests.
              </p>
            </div>

            {/* Desktop count */}

            <div className="hidden shrink-0 rounded-2xl border border-[#E7DFD2] bg-white/60 px-4 py-2.5 text-right sm:block">
              <p className="text-[11px] font-medium text-[#9A9286]">
                Total friends
              </p>

              <p className="text-lg font-bold text-[#163B2A]">
                {friends.length}
              </p>
            </div>

          </div>
        </motion.header>

        {/* =========================
            TABS
        ========================= */}

        <FriendsTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={{
            friends: friends.length,
            requests: requests.length,
            pending: pending.length,
            rejected: rejected.length,
          }}
        />

        {/* =========================
            CONTENT
        ========================= */}

        <AnimatePresence mode="wait">
          <motion.section
            key={activeTab}
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -6,
            }}
            transition={{
              duration: 0.2,
            }}
            className="mt-4 sm:mt-5"
          >
            {renderContent()}
          </motion.section>
        </AnimatePresence>

      </div>
    </main>
  );
};

export default Friends;