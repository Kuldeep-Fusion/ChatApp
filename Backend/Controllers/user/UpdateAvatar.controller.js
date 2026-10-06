import Cloudnariy from '../../config/cloudinary.js'
import User from '../../models/user.model.js';

export  async function UpdateAvtar(req, res) {
        try {
            const id = req.user.userId;
            if(!req.file){
                return res.status(404).json({
                    message: 'not found file',
                })
            }

            const result = await new Promise((resolve, reject) => {
                const stream = Cloudnariy.uploader.upload_stream(
                    {folder: "ChatApp"},
                    (error, result) => {error ? reject(error) : resolve(result)}
                )
                stream.end(req.file.buffer);
            })

            const user = await User.findByIdAndUpdate(
                id,
            { avatar: result.secure_url },
            );
            
            return res.status(201).json({
                    message: 'Avatar Add Successfully',
                    success: true,
                });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                    message: 'Avatar  Failed to Add',
                    success: false,
                });

        }
}