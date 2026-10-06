import Router from 'express'
// import { DeleteUser } from '../Controller/user/Delete.controller.js';
import { GetAllUsers } from '../Controllers/user/AllUser.controller.js';
import { GetSingleUser } from '../Controllers/user/SingleUser.controller.js';
import { DeleteUser } from '../Controllers/user/Delete.controller.js';
import { UpdateSingleUser } from '../Controllers/user/UpdateSingleUser.controller.js';
import {AuthMiddleware} from '../middleware/auth.middleware.js'
import { UpdateAvtar } from '../Controllers/user/UpdateAvatar.controller.js';
import upload from '../middleware/upload.js';
import { GetExplore } from '../Controllers/user/Explore.controller.js';
import { SearchUsers } from '../Controllers/search/SearchUser.controller.js';
import ConnectDB from '../config/MongoDb.js';

const router = Router();
await ConnectDB();
router.get('/get', GetAllUsers); 
router.get('/get/:id', GetSingleUser);
router.delete('/delete/:id', DeleteUser);
router.put('/update',AuthMiddleware,  UpdateSingleUser);
router.get('/explore',AuthMiddleware, GetExplore);
router.put('/update/profile', AuthMiddleware, upload.single("avatar"),  UpdateAvtar);
router.get("/search", AuthMiddleware, SearchUsers);


export default router;