import Router from 'express'
import { Create } from '../Controller/conversation/Create.controller.js';
import { AuthMiddleware } from '../middleware/auth.middleware.js';
import { GetAll } from '../Controller/conversation/GetAll.controller.js';
import { GetSingle } from '../Controller/conversation/GetSingle.controller.js';
import { Delete } from '../Controller/conversation/Delete.controller.js';

const router = Router();

router.get('/get', AuthMiddleware, GetAll); 
router.post('/create', AuthMiddleware, Create); 
router.get('/get/:id', AuthMiddleware, GetSingle)
router.delete('/delete/:id', AuthMiddleware, Delete); //get all users 


export default router;