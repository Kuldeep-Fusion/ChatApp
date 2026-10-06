import { X, UserPlus, MessageCircle, UserMinus } from "@animateicons/react/lucide";
import { useNavigate, useParams } from "react-router-dom";

const ProfilePopup = ({
  user,
  isFriend = false,
  requestSent = false,
  onClose,
  onAddFriend,
  onRemoveFriend,
}) => {

  const id =  useParams();
  const navigate = useNavigate();

  const handleMessage = () => {
  onClose?.();
  navigate(-1);
};

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-lime-100
        px-4
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      {/* Profile Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full max-w-[360px]
          overflow-hidden
          rounded-[32px]
          bg-white
          p-3
          shadow-2xl
        "
      >
        {/* Close */}
        <button
          onClick={handleMessage}
          className="
            absolute right-5 top-5 z-10
            flex h-9 w-9 items-center justify-center
            rounded-full
            bg-white/90
            text-gray-600
            shadow-sm
            backdrop-blur
            transition
            hover:bg-white
            hover:text-green-800
          "
        >
          <X size={18} />
        </button>

        {/* Avatar */}
        <div className="relative">
          <img
            src={
              user?.avatar ||
              "https://i.pravatar.cc/500?img=12"
            }
            alt={user?.name}
            className="
              h-[300px]
              w-full
              rounded-[25px]
              object-cover
            "
          />

          {/* Online */}
          {user?.isOnline && (
            <span
              className="
                absolute bottom-4 left-4
                h-4 w-4
                rounded-full
                border-[3px] border-white
                bg-lime-500
              "
            />
          )}
        </div>

        {/* Content */}
        <div className="px-3 pb-3 pt-5">

          {/* Name */}
          <div className="flex items-center gap-2">
            <h2 className="text-[23px] font-bold tracking-tight text-gray-900">
              {user?.name || "Alex Morgan"}
            </h2>

            {/* Verified */}
            {user?.verified && (
              <span
                className="
                  flex h-5 w-5
                  items-center justify-center
                  rounded-full
                  bg-lime-500
                  text-white
                "
              >
                ✓
              </span>
            )}
          </div>

          {/* Username */}
          <p className="mt-0.5 text-sm font-medium text-green-800">
            @{user?.username || "alexmorgan"}
          </p>

          {/* Bio */}
          <p className="mt-3 max-w-[290px] text-[14px] leading-5 text-gray-500">
            {user?.bio ||
              "Frontend Developer who focuses on simplicity & usability."}
          </p>

          {/* Action */}
          <div className="mt-5 flex items-center gap-2">

            {isFriend ? (
              <>
                {/* Message */}
                <button
                  onClick={handleMessage}
                  className="
                    flex flex-1
                    items-center justify-center gap-2
                    rounded-full
                    bg-green-800
                    px-5 py-3
                    text-sm font-semibold
                    text-white
                    transition
                    hover:bg-green-900
                    active:scale-[0.97]
                  "
                >
                  <MessageCircle size={17} />
                  Message
                </button>

                {/* Remove */}
                <button
                  onClick={onRemoveFriend}
                  className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-full
                    bg-gray-100
                    text-gray-600
                    transition
                    hover:bg-red-50
                    hover:text-red-500
                  "
                  title="Remove Friend"
                >
                  <UserMinus size={17} />
                </button>
              </>
            ) : (
              <button
                disabled={requestSent}
                onClick={onAddFriend}
                className={`
                  flex w-full
                  items-center justify-center gap-2
                  rounded-full
                  px-5 py-3
                  text-sm font-semibold
                  transition
                  active:scale-[0.97]

                  ${
                    requestSent
                      ? "bg-lime-100 text-green-800"
                      : "bg-green-800 text-white hover:bg-green-900"
                  }
                `}
              >
                {requestSent ? (
                  "Request Sent"
                ) : (
                  <>
                    <UserPlus size={17} />
                    Add Friend
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePopup;