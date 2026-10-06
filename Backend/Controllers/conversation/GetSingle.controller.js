import Conversation from "../../models/Conversation.model.js";


export async function GetSingle(req, res) {
    try {
        const { id } = req.params;

        const conversation = await Conversation.findById(id)
            .populate("participants", "-password")
            .populate("lastMessage");

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Conversation fetched successfully",
            data: conversation,
        });

    } catch (error) {
        console.error("Get single conversation error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch conversation",
        });
    }
}