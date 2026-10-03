import Router from 'express'
import { RegisterUser } from '../Controller/auth/Register.Controller.js';
import { LoginUser } from '../Controller/auth/Login.controller.js';
import { LogoutUser } from '../Controller/auth/Logout.Controller.js';
import { getMe } from '../Controller/auth/GetMe.controller.js';
import { AuthMiddleware } from '../middleware/auth.middleware.js';
import { RefreshToken } from '../Controller/auth/RefreshToken.controller.js';

const router = Router();

router.post('/register', RegisterUser);
router.post('/Login', LoginUser);
router.post('/Logout', LogoutUser);
router.get('/me',AuthMiddleware, getMe);
router.post("/refresh", RefreshToken); 



export default router;