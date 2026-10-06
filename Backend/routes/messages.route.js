

import Router from 'express'
import { CreateMessage } from '../Controllers/message/CreateMessage.controller.js';
import { GetSingleMessage } from '../Controllers/message/GetSingleMessage.controller.js';
import { DeleteSingleMessage } from '../Controllers/message/DeleteSingleMessage.controller.js';
import { UpdateMessage } from '../Controllers/message/UpdateMessage.controller.js';
import upload from '../middleware/upload.js';
import { AuthMiddleware } from '../middleware/auth.middleware.js';
import { DeleteMessageMedia } from '../Controllers/message/DeleteMessageMedia.controller.js';
import ConnectDB from '../config/MongoDb.js';

const router = Router();
await ConnectDB();
// router.get('/:conversationId'); 
router.post('/create/:receiverId', AuthMiddleware, upload.single("media"), CreateMessage); //create message in chat box
router.get('/get/:receiverId', AuthMiddleware, GetSingleMessage); // get all message in chat box
router.delete('/delete/:messageId/',AuthMiddleware , DeleteSingleMessage); //delete last message send through id
router.put('/update/:messageId', AuthMiddleware, UpdateMessage); //update single user
router.delete("/:messageId/media", AuthMiddleware, DeleteMessageMedia);// delete only file


export default router;

