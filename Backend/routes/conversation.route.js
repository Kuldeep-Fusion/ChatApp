import Router from 'express'
import { Create } from '../Controllers/conversation/Create.controller.js';
import { AuthMiddleware } from '../middleware/auth.middleware.js';
import { GetAll } from '../Controllers/conversation/GetAll.controller.js';
import { GetSingle } from '../Controllers/conversation/GetSingle.controller.js';
import { Delete } from '../Controllers/conversation/Delete.controller.js';

const router = Router();

router.get('/get', AuthMiddleware, GetAll); 
router.post('/create', AuthMiddleware, Create); 
router.get('/get/:id', AuthMiddleware, GetSingle)
router.delete('/delete/:id', AuthMiddleware, Delete); //get all users 


export default router;