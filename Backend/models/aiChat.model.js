import mongoose from "mongoose";

const aiChatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    response: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const AIChat = mongoose.model("AIChat", aiChatSchema);

export default AIChat;