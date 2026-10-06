import Blocked from "../../models/Blocked.Model.js";
import User from "../../models/user.model.js";

export async function BlockUser(req, res) {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }

        const blocker = req.user.userId;

        if (blocker === userId) {
            return res.status(400).json({
                success: false,
                message: "You cannot block yourself",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const alreadyBlocked = await Blocked.findOne({
            blocker,
            blocked: userId,
        });

        if (alreadyBlocked) {
            return res.status(409).json({
                success: false,
                message: "User already blocked",
            });
        }

        const blockedUser = await Blocked.create({
            blocker,
            blocked: userId,
        });

        return res.status(201).json({
            success: true,
            message: "User blocked successfully",
            data: blockedUser,
        });

    } catch (error) {
        console.error("Block user error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to block user",
        });
    }
}