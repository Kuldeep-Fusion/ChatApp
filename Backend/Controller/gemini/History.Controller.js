import AIChat from "../../models/aiChat.model.js";

export const getAIHistory = async (req, res) => {
  try {
    const userId = req.user.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user",
      });
    }

    const chats = await AIChat.find({
      user: userId,
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: chats.length,
      data: chats,
    });
  } catch (error) {
    console.error("Get AI History Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch AI history",
    });
  }
};