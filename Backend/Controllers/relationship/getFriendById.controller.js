import Relationship from '../../models/relationship.model.js'
import User from "../../models/user.model.js";

export const getFriendById = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    const friendId = req.params.userId;

    // Check whether requested user is actually a friend
    const relationship = await Relationship.findOne({
      status: "accepted",
      $or: [
        {
          sender: currentUserId,
          receiver: friendId,
        },
        {
          sender: friendId,
          receiver: currentUserId,
        },
      ],
    });

    if (!relationship) {
      return res.status(404).json({
        success: false,
        message: "Friend not found",
      });
    }

    // Get friend details
    const friend = await User.findById(friendId).select(
      "name username avatar bio isOnline lastSeen"
    );

    if (!friend) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      friend,
    });
  } catch (error) {
    console.error("Get friend by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};