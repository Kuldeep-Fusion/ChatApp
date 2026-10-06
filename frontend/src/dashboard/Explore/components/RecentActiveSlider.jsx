import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import RecentActiveCard from "./RecentActiveCard";
import { Explore } from "../../../services/users.api";

const RecentActiveSlider = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecentActive = async () => {
    try {
      setLoading(true);

      const res = await Explore();

      const data = res?.data?.Data || [];

      // Temporary:
      // backend se active users filter kar rahe hain.
      const activeUsers = data.filter(
        (user) => user?.active === true
      );

      setUsers(data);
    } catch (error) {
      console.error(
        "Recent active users error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentActive();
  }, []);

  if (loading) {
    return (
      <div className="flex gap-4 overflow-hidden">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="flex w-[58px] shrink-0 flex-col items-center"
          >
            <div
              className="
                h-[52px]
                w-[52px]
                animate-pulse
                rounded-full
                bg-neutral-200
              "
            />

            <div
              className="
                mt-2
                h-2
                w-9
                animate-pulse
                rounded-full
                bg-neutral-200
              "
            />
          </div>
        ))}
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="py-2">
        <p className="text-xs text-[#999]">
          No one is active right now.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Swiper
        slidesPerView="auto"
        spaceBetween={14}
        freeMode
        className="!w-full"
      >
        {users.map((user) => (
          <SwiperSlide
            key={user?._id}
            className="!w-[58px]"
          >
            <RecentActiveCard user={user} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecentActiveSlider;