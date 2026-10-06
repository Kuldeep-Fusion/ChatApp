import Conversation from "../../models/Conversation.model.js";


export async function Delete(req, res) {
    try {
        const { id } = req.params;

        const conversation = await Conversation.findByIdAndDelete(id);

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Conversation deleted successfully",
        });

    } catch (error) {
        console.error("Delete conversation error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete conversation",
        });
    }
}