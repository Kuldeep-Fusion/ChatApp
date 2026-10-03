

import Router from 'express'
import { AuthMiddleware } from '../middleware/auth.middleware.js';
import { BlockUser } from '../Controller/blocked/BlockUser.controller.js';
import { GetBlockedUsers } from '../Controller/blocked/GetBlockedUsers.controller.js';
import { UnblockUser } from '../Controller/blocked/UnblockUser.controller.js';


const router = Router();

router.post('/block', AuthMiddleware, BlockUser); 
router.get('/get', AuthMiddleware, GetBlockedUsers);
router.delete('/unblock/:userId', AuthMiddleware,  UnblockUser); 


export default router;


