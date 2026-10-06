import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

import {
  HeartIcon,
  XIcon,
} from "@animateicons/react/lucide";

import {
  GooeyToaster,
  gooeyToast,
} from "goey-toast";

import "swiper/css";
import "swiper/css/effect-cards";

import ExploreProfileCard from "./ExploreProfileCard";

import { Explore } from "../../services/users.api";
import { AddFriend } from "../../services/friend.api";

const ExploreProfileSlider = ({ search = "" }) => {
  const [users, setUsers] = useState([]);
  const [swiper, setSwiper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingFriend, setAddingFriend] = useState(false);

  const fetchExploreUsers = async () => {
    try {
      setLoading(true);

      const res = await Explore();

      const data = res?.data?.Data || [];

      setUsers(data);
    } catch (error) {
      console.error("Explore users error:", error);

      gooeyToast.error("Couldn't load users", {
        description:
          error?.response?.data?.message ||
          "Unable to load explore users. Please try again.",
        showTimestamp: false,
      });
    } finally {
      setLoading(false);
    }
  };


  const handleAddFriend = async () => {
    if (!swiper || addingFriend) return;

    const currentIndex = swiper.activeIndex;

    const currentUser = users[currentIndex];

    if (!currentUser?._id) {
      gooeyToast.error("Unable to send request", {
        description: "User information is missing.",
        showTimestamp: false,
      });

      return;
    }

    try {
      setAddingFriend(true);

      await AddFriend(currentUser._id);

      gooeyToast.success("Request sent", {
        description:
          "Your friend request has been sent successfully.",
        showTimestamp: false,
      });

      // Move to next profile
      swiper.slideNext();

    } catch (error) {
      console.error(
        "Failed to send friend request:",
        error
      );

      gooeyToast.error("Request failed", {
        description:
          error?.response?.data?.message ||
          "Something went wrong. Please try again.",
        showTimestamp: false,
      });
    } finally {
      setAddingFriend(false);
    }
  };

  // =========================
  // PASS
  // =========================

  const handlePass = () => {
    if (!swiper) return;

    swiper.slideNext();
  };

  // =========================
  // INITIAL FETCH
  // =========================

  useEffect(() => {
    fetchExploreUsers();
  }, []);

  // =========================
  // SEARCH FILTER
  // =========================

  const filteredUsers = users.filter((user) => {
    const query = search.trim().toLowerCase();

    if (!query) return true;

    return (
      user?.name?.toLowerCase().includes(query) ||
      user?.username?.toLowerCase().includes(query) ||
      user?.bio?.toLowerCase().includes(query)
    );
  });

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="mx-auto w-full max-w-[310px]">

        <div
          className="
            aspect-[0.82]
            w-full
            animate-pulse
            rounded-[24px]
            bg-neutral-200
          "
        />

        <div className="mt-4 flex justify-center gap-4">
          <div className="h-11 w-11 animate-pulse rounded-full bg-neutral-200" />

          <div className="h-14 w-14 animate-pulse rounded-full bg-neutral-200" />
        </div>

      </div>
    );
  }

  // =========================
  // EMPTY
  // =========================

  if (!filteredUsers.length) {
    return (
      <div
        className="
          mx-auto
          flex
          aspect-[0.82]
          w-full
          max-w-[310px]
          flex-col
          items-center
          justify-center
          rounded-[24px]
          border
          border-[#deded7]
          bg-white
          px-6
          text-center
        "
      >
        <div
          className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-[#55bd55]/10
            text-xl
          "
        >
          ✨
        </div>

        <h3 className="mt-4 text-base font-semibold text-[#181818]">
          No people found
        </h3>

        <p className="mt-1 text-xs leading-5 text-[#969b9c]">
          Try searching for someone else.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[330px]">

      {/* Toast */}
      <GooeyToaster
        position="top-center"
        showProgress
        closeButton="top-right"
      />

      {/* ================= SWIPER ================= */}

      <Swiper
        modules={[EffectCards]}
        effect="cards"
        grabCursor={!addingFriend}
        slidesPerView={1}
        speed={400}
        onSwiper={setSwiper}
        className="!w-full !overflow-visible"
        cardsEffect={{
          slideShadows: false,
          rotate: true,
          perSlideOffset: 5,
          perSlideRotate: 1,
        }}
      >
        {filteredUsers.map((user) => (
          <SwiperSlide
            key={user?._id || user?.id}
            className="!w-full"
          >
            <ExploreProfileCard user={user} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ================= TWO ACTION BUTTONS ================= */}

      <div
        className="
          relative
          z-50
          mt-4
          flex
          items-center
          justify-center
          gap-5
        "
      >

        {/* CANCEL / PASS */}
        <button
          type="button"
          onClick={handlePass}
          disabled={addingFriend}
          aria-label="Pass profile"
          className="
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-[#deded7]
            bg-white
            text-[#555]
            shadow-[0_4px_15px_rgba(0,0,0,0.06)]
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:border-red-200
            hover:text-red-500
            active:scale-90
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          <XIcon
            size={21}
            duration={0.5}
          />
        </button>

        {/* HEART / ADD FRIEND */}
        <button
          type="button"
          onClick={handleAddFriend}
          disabled={addingFriend}
          aria-label="Add friend"
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-full
            bg-[#55bd55]
            text-white
            shadow-[0_8px_20px_rgba(85,189,85,0.25)]
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-red-600
            hover:shadow-[0_10px_25px_rgba(85,189,85,0.3)]
            active:scale-90
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {addingFriend ? (
            <span
              className="
                h-5
                w-5
                animate-spin
                rounded-full
                border-2
                border-white/40
                border-t-white
              "
            />
          ) : (
            <HeartIcon
              size={24}
              duration={0.5}
            />
          )}
        </button>

      </div>
    </div>
  );
};

export default ExploreProfileSlider;