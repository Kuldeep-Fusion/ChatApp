import User from "../../models/user.model.js";

export async function getMe(req, res) {
    try {
        
        const user = await User.findById(req.user.userId).select("-password");
        console.log(req.user);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.status(200).json({ success: true, user });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}