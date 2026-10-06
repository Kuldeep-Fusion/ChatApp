import Router from 'express'
// import { DeleteUser } from '../Controller/user/Delete.controller.js';
import { GetAllUsers } from '../Controller/user/AllUser.controller.js';
import { GetSingleUser } from '../Controller/user/SingleUser.controller.js';
import { DeleteUser } from '../Controller/user/Delete.controller.js';
import { UpdateSingleUser } from '../Controller/user/UpdateSingleUser.controller.js';
import {AuthMiddleware} from '../middleware/auth.middleware.js'
import { UpdateAvtar } from '../Controller/user/UpdateAvatar.controller.js';
import upload from '../middleware/upload.js';
import { GetExplore } from '../Controller/user/Explore.controller.js';
import { SearchUsers } from '../Controller/search/SearchUser.controller.js';

const router = Router();

router.get('/get', GetAllUsers); 
router.get('/get/:id', GetSingleUser);
router.delete('/delete/:id', DeleteUser);
router.put('/update',AuthMiddleware,  UpdateSingleUser);
router.get('/explore',AuthMiddleware, GetExplore);
router.put('/update/profile', AuthMiddleware, upload.single("avatar"),  UpdateAvtar);
router.get("/search", AuthMiddleware, SearchUsers);


export default router;