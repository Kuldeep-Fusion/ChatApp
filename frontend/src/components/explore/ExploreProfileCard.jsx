import {
  UserPlusIcon,
  ArrowRightIcon,
  ClockIcon,
} from "@animateicons/react/lucide";

const ExploreProfileCard = ({
  user,
  onAddFriend,
}) => {
  return (
    <article
      className="
        w-full
        overflow-hidden
        rounded-[22px]
        border border-[#eeeeeb]
        bg-white
        shadow-[0_8px_30px_rgba(0,0,0,0.05)]
        sm:rounded-[28px]
        sm:shadow-[0_10px_40px_rgba(0,0,0,0.06)]
      "
    >
      {/* Image */}
      <div className="px-3 pt-3 sm:px-5 sm:pt-5">
        <div className="relative overflow-hidden rounded-[18px] bg-[#f3f3ef] sm:rounded-[22px]">
          <img
            src={user.avatar}
            alt={user.name}
            className="
              aspect-[1/1]
              w-full
              object-cover
              sm:aspect-[4/3]
            "
          />

          {user.active && (
            <div
              className="
                absolute left-3 top-3
                flex items-center gap-1.5
                rounded-full
                bg-white/95
                px-2.5 py-1
                text-[10px] font-medium
                text-[#4cae50]
                shadow-sm
                backdrop-blur
                sm:left-4 sm:top-4
                sm:px-3 sm:py-1.5
                sm:text-xs
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#55c557] sm:h-2 sm:w-2" />
              Active now
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-4">

        {/* Name */}
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold tracking-tight text-[#181818] sm:text-xl">
              {user.name}
            </h2>

            <p className="mt-0.5 truncate text-xs text-gray-400 sm:text-sm">
              {user.username}
            </p>
          </div>

          {user.active && (
            <span
              className="
                shrink-0
                rounded-full
                bg-[#eef8ed]
                px-2 py-1
                text-[10px]
                font-medium
                text-[#50b552]
                sm:px-2.5 sm:py-1
                sm:text-[11px]
              "
            >
              Online
            </span>
          )}
        </div>

        {/* Last Active */}
        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-gray-400 sm:mt-3 sm:text-xs">
          <ClockIcon
            size={14}
            duration={0.6}
            color="#999"
          />

          <span>
            {user.active
              ? "Active now"
              : `Last active ${user.lastActive}`}
          </span>
        </div>

        {/* Bio */}
        <p
          className="
            mt-3
            line-clamp-3
            text-xs
            leading-5
            text-gray-500
            sm:mt-4
            sm:text-sm
            sm:leading-6
          "
        >
          {user.bio}
        </p>

        {/* Actions */}
        <div className="mt-4 flex gap-2 sm:mt-5 sm:gap-2.5">
          <button
            type="button"
            onClick={() => onAddFriend(user._id)}
            className="
              flex h-11
              flex-1
              items-center
              justify-center
              gap-1.5
              rounded-xl
              bg-[#55bd55]
              px-3
              text-xs
              font-semibold
              text-white
              transition
              hover:bg-[#49ad49]
              active:scale-[0.98]
              sm:h-12
              sm:gap-2
              sm:px-4
              sm:text-sm
            "
          >
            <UserPlusIcon
              size={17}
              duration={0.7}
              color="#ffffff"
            />

            <span>Add Friend</span>
          </button>

          <button
            type="button"
            aria-label="Next profile"
            className="
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-[#e9e9e5]
              bg-[#fafaf8]
              text-[#555]
              transition
              hover:bg-[#f3f3ef]
              sm:h-12
              sm:w-12
            "
            onClick={(e) => {
              const swiper =
                e.currentTarget.closest(".swiper")?.swiper;

              swiper?.slideNext();
            }}
          >
            <ArrowRightIcon
              size={19}
              duration={0.7}
              color="#555"
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default ExploreProfileCard;