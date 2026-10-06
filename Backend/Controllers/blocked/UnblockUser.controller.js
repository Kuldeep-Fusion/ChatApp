import Blocked from "../../models/Blocked.model.js";

export async function UnblockUser(req, res) {
    try {
        const { userId } = req.params;

        const blocker = req.user.userId;

        const blockedUser = await Blocked.findOneAndDelete({
            blocker,
            blocked: userId,
        });

        if (!blockedUser) {
            return res.status(404).json({
                success: false,
                message: "User is not blocked",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User unblocked successfully",
        });

    } catch (error) {
        console.error("Unblock user error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to unblock user",
        });
    }
}