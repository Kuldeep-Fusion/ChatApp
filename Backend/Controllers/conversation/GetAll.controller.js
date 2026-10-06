import Conversation from "../../models/Conversation.model.js";


export async function GetAll(req, res) {
    try {
        const loggedInUser = req.user.userId;

        const conversations = await Conversation.find({
            participants: loggedInUser,
        })
            .populate("participants", "-password")
            .populate("lastMessage")
            .sort({ lastMessageAt: -1, createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Conversations fetched successfully",
            data: conversations,
        });

    } catch (error) {
        console.error("Get conversations error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch conversations",
        });
    }
}