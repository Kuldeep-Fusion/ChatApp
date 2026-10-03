import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";

import {
  PencilIcon,
} from "@animateicons/react/lucide";

const ProfileHeader = ({ onEdit }) => {
  return (
    <section className="rounded-[28px] bg-white px-5 py-5 shadow-[0_4px_25px_rgba(0,0,0,0.03)] sm:px-7 sm:py-6">
      
      {/* Top */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight text-[#181818]">
          My profile
        </h1>

        <button
          onClick={onEdit}
          type="button"
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-[#edf9ed]
            text-[#49b94b]
            transition
            hover:scale-105
            hover:bg-[#e2f6e2]
          "
        >
          <PencilIcon
            size={21}
            duration={0.8}
            color="#49b94b"
          />
        </button>
      </div>

      {/* Profile */}
      <div className="mt-6 flex flex-col items-center text-center">
        <ProfileAvatar />

        <ProfileInfo />
      </div>

    </section>
  );
};

export default ProfileHeader;