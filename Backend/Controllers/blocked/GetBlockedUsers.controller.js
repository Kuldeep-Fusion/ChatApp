import Blocked from "../../models/Blocked.Model.js";


export async function GetBlockedUsers(req, res) {
    try {
        const blocker = req.user.userId;

        const blockedUsers = await Blocked.find({
            blocker,
        }).populate("blocked", "-password");

        return res.status(200).json({
            success: true,
            message: "Blocked users fetched successfully",
            data: blockedUsers,
        });

    } catch (error) {
        console.error("Get blocked users error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch blocked users",
        });
    }
}