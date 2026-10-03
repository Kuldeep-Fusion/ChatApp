import { useState } from "react";
import { useAuth } from '../../context/AuthContext'
import { UpdateProfile } from "../../services/users.api";
import { GooeyToaster, gooeyToast } from 'goey-toast'


const EditProfileModal = ({ onClose }) => {

  const {user} = useAuth();

  const [form , setForm] = useState({
    name:  user.name,
    username: user.username,
    bio: user.bio,
  });

  const handleChnage = (e) => {
    const {name, value} = e.target;

    setForm((prev)=> ({
      ...prev,
      [name] : value
    }));
  }

const handelSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await UpdateProfile(form);
    gooeyToast.success("Changes saved", {
       spring: false,
      bounce: 0.1,
      timing: {
      displayDuration: 1000,
    },
    });
  } catch (error) {
    console.log(error);
    gooeyToast.error("Update failed", {
    });
  } 
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 backdrop-blur-md" onClick={onClose}>
  <div onClick={(e) => e.stopPropagation()} className="w-full max-w-md overflow-hidden rounded-3xl border border-black/5 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]" >
    {/* Header */}
    <div className="border-b border-gray-100 px-6 py-5 sm:px-7">
        
      <div className="flex items-center justify-between">
        <GooeyToaster position="top-center" />
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-gray-900">
            Edit Profile
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Update your profile information
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

    {/* Form */}
    <form
      onSubmit={handelSubmit}
      className="flex flex-col gap-5 px-6 py-6 sm:px-7"
    >
      {/* Name */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-gray-700"
        >
          Name
        </label>

        <input
          id="name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChnage}
          placeholder="Enter your name"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
        />
      </div>

      {/* Username */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="username"
          className="text-sm font-medium text-gray-700"
        >
          Username
        </label>

        <div className="flex items-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition focus-within:border-green-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-green-500/10">
          <span className="pl-4 text-sm text-gray-400">@</span>

          <input
            id="username"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChnage}
            placeholder="username"
            className="w-full bg-transparent px-2 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Bio */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label
            htmlFor="bio"
            className="text-sm font-medium text-gray-700"
          >
            Bio
          </label>

          <span className="text-xs text-gray-400">
            {form.bio?.length || 0}/160
          </span>
        </div>

        <textarea
          id="bio"
          name="bio"
          value={form.bio}
          onChange={handleChnage}
          maxLength={160}
          rows={4}
          placeholder="Tell something about yourself..."
          className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-6 text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/10"
        />
      </div>

      {/* Actions */}
      <div className="mt-2 flex gap-3 border-t border-gray-100 pt-5">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-[0.98]"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="flex-1 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 hover:shadow-md active:scale-[0.98]"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</div>
  );
};


export default EditProfileModal;