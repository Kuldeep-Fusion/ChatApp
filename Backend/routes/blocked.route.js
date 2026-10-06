

import Router from 'express'
import { AuthMiddleware } from '../middleware/auth.middleware.js';
import { BlockUser } from '../Controllers/blocked/BlockUser.controller.js';
import { GetBlockedUsers } from '../Controllers/blocked/GetBlockedUsers.controller.js';
import { UnblockUser } from '../Controllers/blocked/UnblockUser.controller.js';
import ConnectDB from '../config/MongoDb.js';


const router = Router();
await ConnectDB();
router.post('/block', AuthMiddleware, BlockUser); 
router.get('/get', AuthMiddleware, GetBlockedUsers);
router.delete('/unblock/:userId', AuthMiddleware,  UnblockUser); 


export default router;


