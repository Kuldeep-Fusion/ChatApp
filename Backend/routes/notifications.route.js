import Router from 'express'
import ConnectDB from '../config/MongoDb';

const router = Router();
await ConnectDB();
router.get('/'); 
router.put('/:notificationId/read'); 

router.get('/read-all')
router.delete('/:notificationId.id'); //get all users 


export default router;
