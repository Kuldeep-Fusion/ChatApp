import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { PaperclipIcon } from "@animateicons/react/lucide";
import { UpdateAvatar } from "../../services/users.api";
import { GooeyToaster, gooeyToast } from 'goey-toast'

const EditProfilePhoto = ({ onClose }) => {
  const { user } = useAuth();

  const [preview, setPreview] = useState(user?.avatar || "");
  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!image) {
    gooeyToast.error("Please select an image");
    return;
  }

  const formData = new FormData();
  formData.append("avatar", image);

  gooeyToast.promise(UpdateAvatar(formData), {
    loading: "Saving...",

    success: (res) => {
      onClose();
      return res.data?.message || "Avatar updated successfully";
    },

    error: (error) => {
      console.log(error);

      return (
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    },
  });
};

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
      >
        <GooeyToaster position="top-center" closeOnEscape={false} />
        {/* Header */}
        <div className="border-b border-gray-100 px-6 py-5 sm:px-7">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold tracking-tight text-gray-900">
                Edit Profile Photo
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Update your Display Picture
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col items-center gap-3 px-6 py-6">
          {/* Avatar */}
          <div className="relative">
            <div className="h-28 w-28 overflow-hidden rounded-full border-2 border-green-200 bg-gray-100 shadow-sm">
              {preview ? (
                <img
                  src={preview}
                  alt={user?.name || "Profile avatar"}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                  No Image
                </div>
              )}
            </div>

            {/* Upload */}
            <label
              htmlFor="avatar"
              className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-green-500 text-white shadow-md transition hover:scale-105 hover:bg-green-600"
            >
              <PaperclipIcon size={17} strokeWidth={2} />

              <input
                type="file"
                id="avatar"
                name="avatar"
                onChange={handleImage}
                accept="image/png, image/jpeg"
                className="hidden"
              />
            </label>
          </div>

          <p className="text-xs text-gray-400">
            PNG or JPG • Max 5MB
          </p>

          {/* Buttons */}
          <form
            onSubmit={handleSubmit}
            className="mt-4 flex w-full gap-3"
          >
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!image}
              className="flex-1 rounded-xl bg-green-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Update Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePhoto;