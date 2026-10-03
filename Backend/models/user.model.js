import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },

    username: {
      type: String,
      lowercase: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [30, "Username cannot exceed 30 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    googleId: {
    type: String,
    unique: true,
    sparse: true,
    },

    password: {
      type: String,
      required: [
        function () {
          return this.authProvider === "local";
        },
        "Password is required",
      ],
    },

    authProvider: {
     type: String,
     enum: ["local", "google"],
     default: "local",
    },


    avatar: {
      type: String,
      default: "",
    },
    avatarPublicId: {        
      type: String,
      default: "",
    },
    bio: {
      type: String,
      maxlength: [250, "Bio cannot exceed 250 characters"],
      default: "",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isOnline: {
      type: Boolean,
      default: false,
    },

    lastSeen: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;