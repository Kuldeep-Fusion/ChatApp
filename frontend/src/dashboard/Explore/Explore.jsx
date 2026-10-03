import ExploreProfileSlider from "../../components/explore/ExploreProfileSlider";

const Explore = () => {
  return (
    <main className="h-[90vh] overflow-y-auto px-3 py-4 sm:px-6 sm:py-6 flex ">
      <div className="mx-auto flex justify-center min-h-full w-full max-w-3xl flex-col items-center">
        
        {/* Header */}
        <div className="mb-4 w-full text-center sm:mb-6">
          <h1 className="text-xl font-semibold tracking-tight text-[#181818] sm:text-2xl">
            Explore
          </h1>

          <p className="mx-auto mt-1 max-w-[280px] text-xs leading-5 text-gray-400 sm:max-w-none sm:text-sm">
            Discover new people and make new connections.
          </p>
        </div>

        {/* Slider */}
        <div className="w-full max-w-[290px] sm:max-w-[420px] ">
          <ExploreProfileSlider />
        </div>

      </div>
    </main>
  );
};

export default Explore;