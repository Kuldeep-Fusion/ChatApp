import Relationship from "../../models/relationship.mode.js";
import User from "../../models/user.model.js";

// Send friend request
export const sendFriendRequest = async (req, res) => {
  try {
    const senderId = req.user.userId;
    const receiverId = req.params.id;

    // Can't send request to yourself
    if (senderId.toString() === receiverId.toString()) {
      return res.status(400).json({
        success: false,
        message: "You cannot send friend request to yourself",
      });
    }

    // Check receiver exists
    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check existing relationship
    const existingRelationship = await Relationship.findOne({
      $or: [
        {
          sender: senderId,
          receiver: receiverId,
        },
        {
          sender: receiverId,
          receiver: senderId,
        },
      ],
    });

    if (existingRelationship) {
      return res.status(400).json({
        success: false,
        message: `Relationship already exists with status: ${existingRelationship.status}`,
      });
    }

    const relationship = await Relationship.create({
      sender: senderId,
      receiver: receiverId,
      status: "pending",
    });

    return res.status(201).json({
      success: true,
      message: "Friend request sent",
      relationship,
    });
  } catch (error) {
    console.error("Send friend request error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Get received friend requests
export const getFriendRequests = async (req, res) => {
  try {
    const userId = req.user.userId;

    const requests = await Relationship.find({
      receiver: userId,
      status: "pending",
    })
      .populate("sender", "name username avatar")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("Get friend requests error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Get friends list
export const getFriends = async (req, res) => {
  try {
    const userId = req.user.userId;

    const relationships = await Relationship.find({
      status: "accepted",
      $or: [
        { sender: userId },
        { receiver: userId },
      ],
    })
      .populate("sender", "name username avatar isOnline lastSeen")
      .populate("receiver", "name username avatar isOnline lastSeen")
      .sort({ updatedAt: -1 });

    const friends = relationships.map((relationship) => {
      const friend =
        relationship.sender._id.toString() === userId.toString()
          ? relationship.receiver
          : relationship.sender;

      return friend;
    });

    return res.status(200).json({
      success: true,
      count: friends.length,
      friends,
    });
  } catch (error) {
    console.error("Get friends error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Get Pending Friend Requests
export const getPending = async (req, res) => {
  try {
    const userId = req.user.userId;

    const relationships = await Relationship.find({
      sender: userId,
      status: "pending",
    })
      .populate(
        "receiver",
        "name username avatar isOnline lastSeen"
      )
      .sort({ createdAt: -1 });

    const pending = relationships.map((relationship) => ({
      relationshipId: relationship._id,
      user: relationship.receiver,
      status: relationship.status,
      createdAt: relationship.createdAt,
    }));

    return res.status(200).json({
      success: true,
      count: pending.length,
      pending,
    });
  } catch (error) {
    console.error("Get pending requests error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



// Get Pending Rejected
export const getRejected = async (req, res) => {
  try {
    const userId = req.user.userId;

    const relationships = await Relationship.find({
      status: "rejected",
      $or: [
        { sender: userId },
        { receiver: userId },
      ],
    })
      .populate("sender", "name username avatar isOnline lastSeen")
      .populate("receiver", "name username avatar isOnline lastSeen")
      .sort({ updatedAt: -1 });

    const friends = relationships.map((relationship) => {
      const friend =
        relationship.sender._id.toString() === userId.toString()
          ? relationship.receiver
          : relationship.sender;

      return friend;
    });

    return res.status(200).json({
      success: true,
      count: friends.length,
      friends,
    });
  } catch (error) {
    console.error("Get friends error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Accept friend request
export const acceptFriendRequest = async (req, res) => {
  try {
    const userId = req.user.userId;
    const relationshipId = req.params.id;

    const relationship = await Relationship.findOne({
      _id: relationshipId,
      receiver: userId,
      status: "pending",
    });

    if (!relationship) {
      return res.status(404).json({
        success: false,
        message: "Friend request not found",
      });
    }

    relationship.status = "accepted";

    await relationship.save();

    return res.status(200).json({
      success: true,
      message: "Friend request accepted",
      relationship,
    });
  } catch (error) {
    console.error("Accept friend request error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Reject friend request
export const rejectFriendRequest = async (req, res) => {
  try {
    const userId = req.user.userId;
    const relationshipId = req.params.relationshipId;

    const relationship = await Relationship.findOne({
      _id: relationshipId,
      receiver: userId,
      status: "pending",
    });

    if (!relationship) {
      return res.status(404).json({
        success: false,
        message: "Friend request not found",
      });
    }

    await relationship.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Friend request rejected",
    });
  } catch (error) {
    console.error("Reject friend request error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Remove friend
export const removeFriend = async (req, res) => {
  try {
    const userId =  req.user.userId;
    const friendId = req.params.friendId;
    console.log(friendId);

    const relationship = await Relationship.findOne({
      status: "accepted",
      $or: [
        {
          sender: userId,
          receiver: friendId,
        },
        {
          sender: friendId,
          receiver: userId,
        },
      ],
    });

    if (!relationship) {
      return res.status(404).json({
        success: false,
        message: "Friend relationship not found",
      });
    }

    await relationship.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Friend removed successfully",
    });
  } catch (error) {
    console.error("Remove friend error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// Cancel Friend Request
export const cancelFriendRequest = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { relationshipId } = req.params;

    const relationship = await Relationship.findOne({
      _id: relationshipId,
      sender: userId,
      status: "pending",
    });

    if (!relationship) {
      return res.status(404).json({
        success: false,
        message: "Pending friend request not found",
      });
    }

    await relationship.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Friend request cancelled successfully",
    });
  } catch (error) {
    console.error("Cancel friend request error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};