import Conversation from "../../models/Conversation.model.js";
import User from "../../models/user.model.js";


export async function Create(req, res) {
    try {
        const { receiverId } = req.body;

        // Receiver ID required
        if (!receiverId) {
            return res.status(400).json({
                success: false,
                message: "Receiver ID is required",
            });
        }

        // Logged-in user
       const loggedInUser = req.user.userId;

        // Check receiver exists
        const receiver = await User.findById(receiverId);

        if (!receiver) {
            return res.status(404).json({
                success: false,
                message: "Receiver not found",
            });
        }

        // Check existing conversation
        const existingConversation = await Conversation.findOne({
            participants: {
                $all: [loggedInUser, receiverId],
            },
        });

        if (existingConversation) {
            return res.status(200).json({
                success: true,
                message: "Conversation already exists",
                data: existingConversation,
            });
        }

        // Create new conversation
        const conversation = await Conversation.create({
            participants: [
                loggedInUser,
                receiverId,
            ],
        });

        return res.status(201).json({
            success: true,
            message: "Conversation created successfully",
            data: conversation,
        });

    } catch (error) {
        console.error("Create conversation error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create conversation",
        });
    }
}