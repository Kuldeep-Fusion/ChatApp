import User from "../../models/user.model.js";
import Relationship from "../../models/relationship.model.js";

export async function SearchUsers(req, res) {
    try {
        const userId = req.user._id;
        const { search } = req.query;

        if (!search?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Search query is required",
            });
        }

        // Get current user's friends
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

        // Current user + friends exclude
        const excludeIds = [
            userId,
            ...friendIds,
        ];

        // Search users
        const users = await User.find({
            _id: {
                $nin: excludeIds,
            },

            $or: [
                {
                    name: {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },
                {
                    username: {
                        $regex: search.trim(),
                        $options: "i",
                    },
                },
            ],
        })
            .sort({ createdAt: -1 })
            .select("-password -refreshToken")
            .limit(20);

        return res.status(200).json({
            success: true,
            message: "Users found successfully",
            count: users.length,
            Data: users,
        });

    } catch (error) {
        console.error("SearchUsers Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to search users",
        });
    }
}