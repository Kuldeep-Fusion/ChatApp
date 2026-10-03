import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { GooeyToaster, gooeyToast } from 'goey-toast'

import "swiper/css";
import "swiper/css/effect-cards";

import ExploreProfileCard from "./ExploreProfileCard";
import { Explore } from "../../services/users.api";
import { AddFriend } from "../../services/friend.api";

const ExploreProfileSlider = () => {
  const [newData, setNewData] = useState([]);

  // Fetch explore users
  const fetchExploreUsers = async () => {
    try {
      const res = await Explore();
      const data = res.data.Data;
      setNewData(data);
    } catch (error) {
      gooeyToast.error("Couldn't load users", {
      description:
        error?.response?.data?.message ||
        "Unable to load explore users. Please try again.",
      showTimestamp: false,
    });
    }
  };


// Add friend
const handleAddFriend = async (id) => {
  try {
    console.log("Sending friend request:", id);
    const res = await AddFriend(id);
    console.log("Friend request response:", res.data);
    gooeyToast.success("Request sent", {
      description: "Your friend request has been sent successfully.",
      showTimestamp: false,
    });

  } catch (error) {
    console.error(
      "Failed to send friend request:",
      error
    );
    const message =
      error?.response?.data?.message ||
      "Something went wrong. Please try again.";
    gooeyToast.error("Request failed", {
      description: message,
      showTimestamp: false,
    });
  }
};



  // Fetch users when component mounts
  useEffect(() => {
    fetchExploreUsers();
  }, []);

  return (
    <div className="w-full px-0.5 sm:px-0">
      <GooeyToaster position="top-center" showProgress closeButton="top-right" />
      <Swiper
        modules={[EffectCards]}
        effect="cards"
        grabCursor={true}
        slidesPerView={1}
        spaceBetween={12}
        cardsEffect={{
          slideShadows: false,
          rotate: true,
          perSlideOffset: 6,
          perSlideRotate: 1,
        }}
        className="!w-full"
      >
        {newData.map((user) => (
          <SwiperSlide
            key={user._id || user.id}
            className="!w-full"
          >
            <ExploreProfileCard
              user={user}
              onAddFriend={handleAddFriend}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ExploreProfileSlider;