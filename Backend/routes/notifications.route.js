import Router from 'express'

const router = Router();

router.get('/'); 
router.put('/:notificationId/read'); 

router.get('/read-all')
router.delete('/:notificationId.id'); //get all users 


export default router;
