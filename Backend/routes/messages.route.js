

import Router from 'express'
import { CreateMessage } from '../Controller/message/CreateMessage.controller.js';
import { GetSingleMessage } from '../Controller/message/GetSingleMessage.controller.js';
import { DeleteSingleMessage } from '../Controller/message/DeleteSingleMessage.controller.js';
import { UpdateMessage } from '../Controller/message/UpdateMessage.controller.js';
import upload from '../middleware/upload.js';
import { AuthMiddleware } from '../middleware/auth.middleware.js';
import { DeleteMessageMedia } from '../Controller/message/DeleteMessageMedia.controller.js';

const router = Router();

// router.get('/:conversationId'); 
router.post('/create/:receiverId', AuthMiddleware, upload.single("media"), CreateMessage); //create message in chat box
router.get('/get/:receiverId', AuthMiddleware, GetSingleMessage); // get all message in chat box
router.delete('/delete/:messageId/',AuthMiddleware , DeleteSingleMessage); //delete last message send through id
router.put('/update/:messageId', AuthMiddleware, UpdateMessage); //update single user
router.delete("/:messageId/media", AuthMiddleware, DeleteMessageMedia);// delete only file


export default router;

