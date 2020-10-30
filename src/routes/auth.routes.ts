import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import user from '../models/user';

const router = Router();

router.route('/signup')
    .post(userController.signup)

router.route('/login')
    .post(userController.signin)

export default router; 