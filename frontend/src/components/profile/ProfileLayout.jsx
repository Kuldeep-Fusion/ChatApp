import { useState  } from "react";
import { Link } from "react-router-dom";

import ProfileHeader from "./ProfileHeader";

import ProfileSection from "./ProfileSection";
import ProfileMenuItem from "./ProfileMenuItem";

import EditProfileModal from "./EditProfileModal";
// import BlockedUsersModal from "./BlockedUsersModal";
import FriendsModal from "./FriendsModal";
import EditProfileAvatar from './EditProfilePhoto'




import {
  PencilIcon,

  UsersIcon,
  // UserXIcon,
  ShieldCheckIcon,
  LogOutIcon,
} from "@animateicons/react/lucide";
import { useAuth } from "../../context/AuthContext";
import { CircleUserRoundIcon } from "lucide-react";
import { DeleteAccount } from "../../services/auth.api";
import { gooeyToast, GooeyToaster } from "goey-toast";

const ProfileLayout = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const[showEditProfileAvatar, setShowEditProfileAvatar] = useState(false);
  // const [showBlocked, setShowBlocked] = useState(false);
  const [showFriends, setShowFriends] = useState(false);



  const {logout} = useAuth();

const handleDeleteAccount = async () => {
  const confirmed = window.confirm(
    "Are you sure you want to delete your account? This action cannot be undone."
  );

  if (!confirmed) return;

  try {
    const res = await gooeyToast.promise(
      DeleteAccount(),
      {
        loading: {
          title: "Deleting account...",
          description: "Please wait",
        },
        success: {
          title: "Account deleted",
          description: "Your account has been deleted successfully.",
        },
        error: {
          title: "Delete failed",
          description: "Unable to delete your account. Please try again.",
        },
      }
    );

    console.log(res?.data);

    // logout / navigate after successful deletion
    // navigate("/login");
  } catch (error) {
    console.error("Delete account error:", error);
  }
};

  return (
    <>
      {/* =========================
          PROFILE PAGE
      ========================== */}

      <main className="h-screen overflow-y-auto bg-[#f7f7f5] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl">
          <GooeyToaster position="top-center" closeOnEscape={false} />


          {/* =========================
              PROFILE HEADER
          ========================== */}

          <ProfileHeader
            onEdit={() => setShowEditProfileAvatar(true)}
          />

          {/* =========================
              PROFILE STATS
          ========================== */}

          {/* =========================
              ACCOUNT
          ========================== */}

          <ProfileSection title="Account">

            <ProfileMenuItem
              icon={PencilIcon}
              title="Edit profile"
              description="Update your name, photo and bio"
              iconBg="bg-[#eef8e8]"
              iconColor="#54b948"
              onClick={() => setShowEditProfile(true)}
            />

          </ProfileSection>

          {/* =========================
              SOCIAL
          ========================== */}

          <ProfileSection title="Social">

            {/* Friends */}
            <ProfileMenuItem
              icon={UsersIcon}
              title="Friends"
              description="View and manage your friends"
              iconBg="bg-[#f3efff]"
              iconColor="#8966d5"
              onClick={() => setShowFriends(true)}
            />

            {/* Blocked Users */}
            {/* <ProfileMenuItem
              icon={UserXIcon}
              title="Blocked users"
              description="Manage people you have blocked"
              iconBg="bg-[#fff0ef]"
              iconColor="#e8665c"
              onClick={() => setShowBlocked(true)}
            /> */}

          </ProfileSection>

          {/* =========================
              PRIVACY
          ========================== */}

          <ProfileSection title="Privacy">
            <Link to="/privacy-policy">

            <ProfileMenuItem
              icon={ShieldCheckIcon}
              title="Privacy & security"
              description="Control your privacy settings"
              iconBg="bg-[#fff7e8]"
              iconColor="#d89a28"
              
            />
            </Link>

          </ProfileSection>

          {/* =========================
              LOGOUT
          ========================== */}

          <section className="mt-2">

            <button
              type="button"
              onClick={logout}
              className="
                flex
                w-full
                items-center
                gap-4
                rounded-2xl
                border
                border-red-100
                bg-white
                px-4
                py-3.5
                text-left
                transition
                hover:border-red-200
                hover:bg-red-50/40
              "
            >

              {/* Icon */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-red-50
                "
              >
                <LogOutIcon
                  size={20}
                  duration={0.8}
                  color="#e05b52"
                />
              </div>

              {/* Content */}

              <div className="flex-1">

                <span  className="text-sm font-semibold text-red-500">
                  Logout
                </span>

                <p className="mt-0.5 text-xs text-gray-400">
                  Sign out from this account
                </p>

              </div>

            </button>

          </section>

           <section className="mt-2">

            <button
              type="button"
              onClick={handleDeleteAccount}
              className="
                flex
                w-full
                items-center
                gap-4
                rounded-2xl
                border
                border-red-100
                bg-white
                px-4
                py-3.5
                text-left
                transition
                hover:border-red-200
                hover:bg-red-50/40
              "
            >

              {/* Icon */}

              <div
                className="
                  flex
                  h-10
                  w-10
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-red-50
                "
              >
                <CircleUserRoundIcon
                  size={20}
                  duration={0.8}
                  color="#e05b52"
                />
              </div>

              {/* Content */}

              <div className="flex-1">

                <span  className="text-sm font-semibold text-red-500">
                  Delete Account
                </span>

                <p className="mt-0.5 text-xs text-gray-400">
                  Permanently delete your account and data
                </p>

              </div>

            </button>

          </section>

        </div>
      </main>

      {/* =========================
          MODALS
      ========================== */}

      {/* Edit Profile */}

      {showEditProfile && (
        <EditProfileModal
          onClose={() => setShowEditProfile(false)}
        />
      )}

      {showEditProfileAvatar && (
        <EditProfileAvatar
          onClose={() => setShowEditProfileAvatar(false)}
        />
      )}

      {/* Blocked Users */}

      {/* {showBlocked && (
        <BlockedUsersModal
          onClose={() => setShowBlocked(false)}
        />
      )} */}

      {/* Friends */}

      {showFriends && (
        <FriendsModal
          onClose={() => setShowFriends(false)}
        />
      )}

    </>
  );
};

export default ProfileLayout;