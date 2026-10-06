import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    // Jisko notification milega
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Notification kis user ki wajah se hai
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    type: {
      type: String,
      enum: [
        "message",
        "friend_request",
        "friend_accepted",
        "friend_rejected",
        "friend_removed",
        "system",
      ],
      required: true,
    },

    // Message notification ke liye
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      default: null,
    },

    // Notification text
    message: {
      type: String,
      default: "",
    },

    isRead: {
      type: Boolean,
      default: false,
    },

    readAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Fast notification listing
notificationSchema.index({
  recipient: 1,
  createdAt: -1,
});

const Notification = mongoose.model(
  "Notification",
  notificationSchema
);

export default Notification;