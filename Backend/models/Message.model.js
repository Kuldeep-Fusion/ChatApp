import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    type: {
      type: String,
      enum: ["text", "image", "video", "file"],
      default: "text",
    },

    content: {
      type: String,
      trim: true,
      default: "",
    },

    media: {
      url: { type: String, default: "",},
      publicId: { type: String, default: "", },
      resourceType: { type: String, default: "" },
    },
    // Message.Model.js
    isMediaDeleted: { type: Boolean, default: false },
    // Message.Model.js
    isEdited: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
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

const Message =
  mongoose.models.Message ||
  mongoose.model("Message", messageSchema);

  export default Message;