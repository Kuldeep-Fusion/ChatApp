import { useAuth } from "../../context/AuthContext";

const ProfileAvatar = () => {
  const { user } = useAuth();
      console.log(user);
    
  return (
    <div className="relative">
      <img
        src={user.avatar}
        alt="Profile"
        className="
          h-24
          w-24
          rounded-full
          object-cover
          ring-4
          ring-[#f5f5f3]
          sm:h-28
          sm:w-28
        "
      />

      {/* Online */}
      <span
        className="
          absolute
          bottom-1
          right-1
          h-5
          w-5
          rounded-full
          border-[3px]
          border-white
          bg-[#58c95b]
        "
      />
    </div>
  );
};

export default ProfileAvatar;