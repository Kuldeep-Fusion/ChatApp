import { useState } from "react";

import ExploreProfileSlider from "../../components/explore/ExploreProfileSlider";
import RecentActiveSlider from "./components/RecentActiveSlider";
import Header from "../../components/common/header";

const Explore = () => {
  const [search, setSearch] = useState("");

  return (
    <main
      className="
        mx-auto
        w-full
        sm:max-w-[520px]
        sm:rounded-[36px]
        sm:border
        sm:border-[#d9d9d1]
        sm:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
        sm:overflow-hidden
      "
    >
      {/* Dark green header */}
      <Header />

      {/* White content card — single unified block */}
      <div className="bg-white rounded-t-[32px] -mt-4 px-5 pt-5 pb-8 sm:px-6 sm:pt-6">

        {/* ================= RECENTLY ACTIVE ================= */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#181818]">
              Recently Active
            </h2>
          </div>
          <RecentActiveSlider />
        </div>

        {/* ================= TITLE ================= */}
        <div className="mt-5 mb-5">
          <h1
            className="
              text-[26px]
              font-bold
              tracking-[-0.7px]
              text-[#181818]
            "
          >
            Explore
          </h1>
          <p className="mt-0.5 text-sm text-[#969b9c]">
            Find people you might connect with.
          </p>
        </div>

        {/* ================= PROFILE SLIDER ================= */}
        <div className="flex items-start justify-center">
          <div className="w-full max-w-[300px]">
            <ExploreProfileSlider search={search} />
          </div>
        </div>

      </div>
    </main>
  );
};

export default Explore;