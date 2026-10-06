import User from "../../models/user.model.js";

export async function GetAllUsers(req, res) {
    try {
        const user = await User.find({});

        return res.status(200).json({
            message: 'Get all All data',
            success: true,
            Data: user

        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Failed to get all All data',
            success: false,
        })
    }
    
}
