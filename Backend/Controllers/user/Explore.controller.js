import User from "../../models/user.model.js";
import Relationship from "../../models/relationship.model.js";

export async function GetExplore(req, res) {
    try {
        console.log(req.user);
        const userId = req.user.userId;

        // Current user's accepted friendships
        const relationships = await Relationship.find({
            $or: [
                {
                    sender: userId,
                    status: "accepted",
                },
                {
                    receiver: userId,
                    status: "accepted",
                },
            ],
        }).select("sender receiver");

        // Friend IDs
        const friendIds = relationships.map((item) => {
            return item.sender.toString() === userId.toString()
                ? item.receiver
                : item.sender;
        });

        // Current user + friends ko exclude karo
        const excludeIds = [
            userId,
            ...friendIds,
        ];

        // New users first
        const users = await User.find({
            _id: {
                $nin: excludeIds,
            },
        })
            .sort({ createdAt: -1 })
            .select("-password -refreshToken");

        return res.status(200).json({
            message: "Explore users fetched successfully",
            success: true,
            count: users.length,
            Data: users,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to get explore users",
            success: false,
        });
    }
}