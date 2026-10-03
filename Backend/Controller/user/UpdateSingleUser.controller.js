import User from "../../models/user.model.js";


export async function UpdateSingleUser(req, res) {
try {
        console.log(req.user.userId);
        const id = req.user.userId;
        console.log(id);
        const {name, username, bio  } =  req.body;

        const user = await User.findByIdAndUpdate(id, {
            name, 
            username, 
            bio, 
        });

         return res.status(201).json({
                message: 'User Updated SuccessFully',
                success: true
            });

  } catch (error) {
        console.log(error);
        return res.status(500).json({
                message: 'Failed to Update User',
                success: false
            });
  }
    
}