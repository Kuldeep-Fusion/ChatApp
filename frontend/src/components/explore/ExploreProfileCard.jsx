import {
  ClockIcon,
  MapPinIcon,
} from "@animateicons/react/lucide";

const ExploreProfileCard = ({ user }) => {
  return (
    <article
      className="
        relative
        mx-auto
        aspect-[0.82]
        w-full
        max-w-[310px]
        overflow-hidden
        rounded-[24px]
        bg-[#e9e9e3]
        shadow-[0_14px_35px_rgba(0,0,0,0.12)]
      "
    >
      <img
         src={user.avatar || "/logo.png"}
        alt={user?.name || "Profile"}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/85
          via-black/15
          to-transparent
        "
      />

      {user?.active && (
        <div
          className="
            absolute
            left-3
            top-3
            flex
            items-center
            gap-1.5
            rounded-full
            bg-black/35
            px-2.5
            py-1
            text-[10px]
            font-medium
            text-white
            backdrop-blur-md
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-[#55c557]
              shadow-[0_0_8px_rgba(85,197,87,0.8)]
            "
          />

          Active
        </div>
      )}

      {/* ================= TOP RIGHT HEART ================= */}
      {/* 
        Intentionally disabled.
        Main Heart action is below the card.
      */}

      {/* ================= USER INFO ================= */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          p-4
        "
      >

        {/* Name */}
        <div className="flex items-center gap-1.5">
          <h2
            className="
              truncate
              text-[21px]
              font-bold
              leading-tight
              tracking-tight
              text-white
            "
          >
            {user?.name}
          </h2>

          {user?.age && (
            <span
              className="
                shrink-0
                text-sm
                text-white/75
              "
            >
              {user.age}
            </span>
          )}
        </div>

        {/* Username */}
        {user?.username && (
          <p
            className="
              mt-0.5
              truncate
              text-xs
              text-white/60
            "
          >
            {user.username}
          </p>
        )}

        {/* Location / Active */}
        <div
          className="
            mt-2
            flex
            items-center
            gap-1.5
            text-[11px]
            text-white/70
          "
        >
          {user?.location ? (
            <>
              <MapPinIcon size={12} />

              <span>
                {user.location}
              </span>
            </>
          ) : (
            <>
              <ClockIcon size={12} />

              <span>
                {user?.active
                  ? "Active now"
                  : user?.lastActive
                    ? `Active ${user.lastActive}`
                    : "Recently active"}
              </span>
            </>
          )}
        </div>

        {/* Bio */}
        {user?.bio && (
          <p
            className="
              mt-2
              line-clamp-2
              max-w-[280px]
              text-xs
              leading-4
              text-white/85
            "
          >
            {user.bio}
          </p>
        )}

      </div>
    </article>
  );
};

export default ExploreProfileCard;