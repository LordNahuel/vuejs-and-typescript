import { Router } from 'express'; 
import * as userController from '../controllers/user.controller'; 
import user from '../models/user';

const router = Router();

router.route('/')
    .get(userController.getAll)
    .post(userController.save)

router.route('/:id')
    .get(userController.getById)
    .put(userController.update)

export default router; 