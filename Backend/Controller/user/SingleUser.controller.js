import User from "../../models/user.model.js";

export async function GetSingleUser(req, res) {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        return res.status(200).json({
            message: 'Fetched Data',
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
