import { useState } from "react";

import ProfileHeader from "./ProfileHeader";

import ProfileSection from "./ProfileSection";
import ProfileMenuItem from "./ProfileMenuItem";


import EditProfileModal from "./EditProfileModal";
import BlockedUsersModal from "./BlockedUsersModal";
import FriendsModal from "./FriendsModal";
import EditProfileAvatar from './EditProfilePhoto'


import {
  PencilIcon,

  UsersIcon,
  UserXIcon,
  ShieldCheckIcon,
  LogOutIcon,
} from "@animateicons/react/lucide";
import { useAuth } from "../../context/AuthContext";

const ProfileLayout = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const[showEditProfileAvatar, setShowEditProfileAvatar] = useState(false);
  const [showBlocked, setShowBlocked] = useState(false);
  const [showFriends, setShowFriends] = useState(false);

  const {logout} = useAuth();

  return (
    <>
      {/* =========================
          PROFILE PAGE
      ========================== */}

      <main className="h-screen overflow-y-auto bg-[#f7f7f5] px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-3xl">

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
            <ProfileMenuItem
              icon={UserXIcon}
              title="Blocked users"
              description="Manage people you have blocked"
              iconBg="bg-[#fff0ef]"
              iconColor="#e8665c"
              onClick={() => setShowBlocked(true)}
            />

          </ProfileSection>

          {/* =========================
              PRIVACY
          ========================== */}

          <ProfileSection title="Privacy">

            <ProfileMenuItem
              icon={ShieldCheckIcon}
              title="Privacy & security"
              description="Control your privacy settings"
              iconBg="bg-[#fff7e8]"
              iconColor="#d89a28"
            />

          </ProfileSection>

          {/* =========================
              LOGOUT
          ========================== */}

          <section className="mt-6">

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

      {showBlocked && (
        <BlockedUsersModal
          onClose={() => setShowBlocked(false)}
        />
      )}

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