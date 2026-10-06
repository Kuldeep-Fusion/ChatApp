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
        flex
        w-full
        flex-col
        overflow-scroll
        bg-green-950
        sm:max-w-[520px]
        sm:rounded-[36px]
        sm:border
        sm:border-[#d9d9d1]
        sm:shadow-[0_20px_60px_rgba(0,0,0,0.08)]
      "
    >
       <Header/>
      {/* ================= TOP SECTION ================= */}
      <div className="shrink-0 px-5 pt-5 sm:px-6 sm:pt-6 rounded-t-4xl bg-white">
       
        {/* Search + Filter */}

        {/* ================= MATCHES ================= */}
       {/* Recent Active */}
      <div className="mt-1">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-[#181818]">
            Recently Active
         </h2>
       </div>

        <RecentActiveSlider />
      </div>

        {/* ================= TITLE ================= */}
        <div className="mt-5">
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
      </div>

      {/* ================= PROFILE SLIDER ================= */}
      <div
        className="
          flex
          min-h-0
          flex-1
          items-start
          justify-center
          px-4
          pb-2
          bg-white
          pt-4
        "
      >
        <div className="w-full max-w-[280px]">
          <ExploreProfileSlider search={search} />
        </div>
      </div>
    </main>
  );
};

export default Explore;