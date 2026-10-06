import Router from 'express'
import { RegisterUser } from '../Controllers/auth/Register.Controller.js';
import { LoginUser } from '../Controllers/auth/Login.controller.js';
import { LogoutUser } from '../Controllers/auth/Logout.Controller.js';
import { getMe } from '../Controllers/auth/GetMe.controller.js';
import { AuthMiddleware } from '../middleware/auth.middleware.js';
import { RefreshToken } from '../Controllers/auth/RefreshToken.controller.js';
import { DeleteUser } from '../Controllers/auth/DeleteSingle.controller.js';

const router = Router();

router.post('/register', RegisterUser);
router.post('/Login', LoginUser);
router.post('/Logout', LogoutUser);
router.get('/me',AuthMiddleware, getMe);
router.post("/refresh", AuthMiddleware,  RefreshToken); 
router.delete("/delete", AuthMiddleware,  DeleteUser); 



export default router;