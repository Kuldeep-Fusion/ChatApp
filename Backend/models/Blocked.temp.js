import mongoose from "mongoose";

const blockedSchema = new mongoose.Schema(
  {
    blocker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    blocked: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

blockedSchema.index(
  { blocker: 1, blocked: 1 },
  { unique: true }
);

const Blocked = mongoose.model("Blocked", blockedSchema);

export default Blocked;