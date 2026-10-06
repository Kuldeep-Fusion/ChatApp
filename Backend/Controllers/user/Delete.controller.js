import User from "../../models/user.model.js";

export async function DeleteUser(req, res) {
        try {
            const {id} = req.params;
            const DeleteUser = await User.findByIdAndDelete(id);

            return res.status(201).json({
            message: `User Deletd Successfully ${id}`,
            success: true,
            UserDeleted: DeleteUser,
            });

        
        } catch (error) {
            console.log('Failed to Delete User', error);
        }
}