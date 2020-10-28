import { Router } from 'express'; 
import * as userController from '../controllers/user.controller'; 

const router = Router();

router.route('/')
    .get(userController.getmessage)
    .post(userController.save)

export default router; 